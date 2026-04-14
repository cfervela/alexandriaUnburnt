const validarCarritoVenta = (req, res, next) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Carrito vacio o invalido'
    });
  }

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Formato de item invalido'
      });
    }

    const { isbn, quantity } = item;

    if (!isbn || typeof isbn !== 'string' || isbn.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Cada item debe incluir un ISBN valido'
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Cada item debe incluir una cantidad entera mayor a 0'
      });
    }
  }

  return next();
};

module.exports = {
  validarCarritoVenta,
};
