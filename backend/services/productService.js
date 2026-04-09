const pool = require('../config/database');

// CREATE - Insert a new product
const createProduct = async (productData) => {
  const { isbn, title, author, genre, publisher, price, stock, image, description } = productData;
  const [result] = await pool.query(
    'INSERT INTO products (isbn, title, author, genre, publisher, price, stock, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [isbn, title, author, genre, publisher, price, stock, image, description]
  );
  return result;
};

// READ - Get all products
const getAllProducts = async () => {
  const [result] = await pool.query('SELECT * FROM products');
  return result;
};

// READ - Get a single product by ISBN
const getProductByIsbn = async (isbn) => {
  const [result] = await pool.query('SELECT * FROM products WHERE isbn = ?', [isbn]);
  return result;
};

// UPDATE - Update a product by ISBN
const updateProduct = async (isbn, productData) => {
  const { title, author, genre, publisher, price, stock, image, description } = productData;
  const [result] = await pool.query(
    'UPDATE products SET title = ?, author = ?, genre = ?, publisher = ?, price = ?, stock = ?, image = ?, description = ? WHERE isbn = ?',
    [title, author, genre, publisher, price, stock, image, description, isbn]
  );
  return result;
};

// DELETE - Delete a product by ISBN
const deleteProduct = async (isbn) => {
  const [result] = await pool.query('DELETE FROM products WHERE isbn = ?', [isbn]);
  return result;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByIsbn,
  updateProduct,
  deleteProduct,
};
