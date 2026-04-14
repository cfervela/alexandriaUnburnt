const db = require('../config/database');

exports.procesarVenta = async (items) => {
  try {

    // Validar y actualizar stock para cada item
    for (const item of items) {
      const { isbn, quantity } = item;

      try {
        // Verificar stock disponible (mysql2/promise retorna [rows, fields])
        const [rows] = await db.query(
          'SELECT stock FROM products WHERE isbn = ?',
          [isbn]
        );

        if (!rows || rows.length === 0) {
          return {
            success: false,
            message: `Producto con ISBN ${isbn} no encontrado`
          };
        }

        const stockActual = rows[0].stock;
        if (stockActual < quantity) {
          return {
            success: false,
            message: `Stock insuficiente para ISBN ${isbn}. Disponible: ${stockActual}, Solicitado: ${quantity}`
          };
        }

        // Actualizar stock (restar las unidades vendidas)
        await db.query(
          'UPDATE products SET stock = stock - ? WHERE isbn = ?',
          [quantity, isbn]
        );
      } catch (dbError) {
        console.error(`Error procesando ${isbn}:`, dbError.message);
        return {
          success: false,
          message: `Error procesando producto ${isbn}: ${dbError.message}`
        };
      }
    }

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
