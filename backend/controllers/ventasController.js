const ventasService = require('../services/ventasService');

exports.procesarVenta = async (req, res) => {
  try {
    const { items } = req.body;

    // Validación básica
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Carrito vacío o inválido'
      });
    }

    // Procesar la venta (actualizar stock)
    const resultado = await ventasService.procesarVenta(items);

    if (resultado.success) {
      res.json({
        success: true,
        message: 'Venta procesada exitosamente',
        data: resultado
      });
    } else {
      res.status(400).json({
        success: false,
        message: resultado.message || 'Error al procesar la venta'
      });
    }
  } catch (error) {
    console.error('Error en procesarVenta:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la venta'
    });
  }
};
