const { validateCreateProduct, validateUpdateProduct } = require('../models/productModel');

const validarCrearProducto = (req, res, next) => {
  const validation = validateCreateProduct(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ error: validation.errors[0] });
  }

  req.body = validation.value;
  return next();
};

const validarActualizarProducto = (req, res, next) => {
  const validation = validateUpdateProduct(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ error: validation.errors[0] });
  }

  req.body = validation.value;
  return next();
};

module.exports = {
  validarCrearProducto,
  validarActualizarProducto,
};
