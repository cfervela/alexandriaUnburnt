const db = require('../config/database');

// Promisificar db.query para usar async/await
const queryAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

exports.procesarVenta = async (items) => {
  try {
    // Validar entrada
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        success: false,
        message: 'Carrito vacío o inválido'
      };
    }

    // Validar y actualizar stock para cada item
    for (const item of items) {
      const { isbn, quantity } = item;

      // Verificar stock disponible
      const stockResult = await queryAsync(
        'SELECT stock FROM products WHERE isbn = ?',
        [isbn]
      );

      if (!stockResult || stockResult.length === 0) {
        return {
          success: false,
          message: `Producto con ISBN ${isbn} no encontrado`
        };
      }

      const stockActual = stockResult[0].stock;
      if (stockActual < quantity) {
        return {
          success: false,
          message: `Stock insuficiente para ISBN ${isbn}. Disponible: ${stockActual}, Solicitado: ${quantity}`
        };
      }

      // Actualizar stock (restar las unidades vendidas)
      await queryAsync(
        'UPDATE products SET stock = stock - ? WHERE isbn = ?',
        [quantity, isbn]
      );
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
