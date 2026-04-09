const {
  createProduct,
  getAllProducts,
  getProductByIsbn,
  updateProduct,
  deleteProduct,
} = require('../services/productService');

// POST - Create a new product
const createProductHandler = async (req, res) => {
  try {
    const result = await createProduct(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET - Get all products
const getAllProductsHandler = async (req, res) => {
  try {
    const result = await getAllProducts();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET - Get a single product by ISBN
const getProductByIsbnHandler = async (req, res) => {
  try {
    const result = await getProductByIsbn(req.params.isbn);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// PUT - Update a product by ISBN
const updateProductHandler = async (req, res) => {
  try {
    const result = await updateProduct(req.params.isbn, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Delete a product by ISBN
const deleteProductHandler = async (req, res) => {
  try {
    const result = await deleteProduct(req.params.isbn);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProductHandler,
  getAllProductsHandler,
  getProductByIsbnHandler,
  updateProductHandler,
  deleteProductHandler,
};
