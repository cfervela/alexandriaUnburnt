const db = require('../config/database');

exports.procesarVenta = async (items) => {
  try {
    console.log('ventasService.procesarVenta iniciado con items:', items);

    // Validar entrada
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('Items vacío o inválido');
      return {
        success: false,
        message: 'Carrito vacío o inválido'
      };
    }

    // Validar y actualizar stock para cada item
    for (const item of items) {
      const { isbn, quantity } = item;
      console.log(`Procesando ISBN ${isbn}, cantidad ${quantity}`);

      try {
        // Verificar stock disponible (mysql2/promise retorna [rows, fields])
        const [rows] = await db.query(
          'SELECT stock FROM products WHERE isbn = ?',
          [isbn]
        );
        console.log(`Stock result para ${isbn}:`, rows);

        if (!rows || rows.length === 0) {
          console.log(`Producto no encontrado: ${isbn}`);
          return {
            success: false,
            message: `Producto con ISBN ${isbn} no encontrado`
          };
        }

        const stockActual = rows[0].stock;
        if (stockActual < quantity) {
          console.log(`Stock insuficiente para ${isbn}: ${stockActual} < ${quantity}`);
          return {
            success: false,
            message: `Stock insuficiente para ISBN ${isbn}. Disponible: ${stockActual}, Solicitado: ${quantity}`
          };
        }

        // Actualizar stock (restar las unidades vendidas)
        console.log(`Actualizando stock para ${isbn}`);
        await db.query(
          'UPDATE products SET stock = stock - ? WHERE isbn = ?',
          [quantity, isbn]
        );
        console.log(`Stock actualizado para ${isbn}`);
      } catch (dbError) {
        console.error(`Error procesando ${isbn}:`, dbError.message);
        return {
          success: false,
          message: `Error procesando producto ${isbn}: ${dbError.message}`
        };
      }
    }

    console.log('Venta procesada correctamente');
    return {
      success: true,
      message: 'Venta procesada correctamente',
      itemsProcesados: items.length
    };
  } catch (error) {
    console.error('Error en procesarVenta:', error);
    return {
      success: false,
      message: 'Error procesando la venta'
    };
  }
};
