const express = require('express');
const {
  createProductHandler,
  getAllProductsHandler,
  getProductByIsbnHandler,
  updateProductHandler,
  deleteProductHandler,
} = require('../controllers/productController');
const {
  validarCrearProducto,
  validarActualizarProducto,
} = require('../middlewares/validarProductoMiddleware');

const router = express.Router();

// CREATE - POST /products
router.post('/products', validarCrearProducto, createProductHandler);

// READ - GET /products
router.get('/products', getAllProductsHandler);

// READ - GET /products/:isbn
router.get('/products/:isbn', getProductByIsbnHandler);

// UPDATE - PUT /products/:isbn
router.put('/products/:isbn', validarActualizarProducto, updateProductHandler);

// DELETE - DELETE /products/:isbn
router.delete('/products/:isbn', deleteProductHandler);

module.exports = router;
