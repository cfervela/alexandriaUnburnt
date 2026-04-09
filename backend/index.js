require('dotenv').config({ path: '../.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MARIADB_HOST || 'localhost',
  port: Number(process.env.MARIADB_PORT || 3306),
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
});

// CREATE
app.post('/products', (req, res) => {
    const { isbn, title, author, genre, publisher, price, stock, image, description } = req.body;
    db.query('INSERT INTO products (isbn, title, author, genre, publisher, price, stock, image, description) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)', [isbn, title, author, genre, publisher, price, stock, image, description], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//READ
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//SINGLE PRODUCT
app.get('/products/:isbn', (req, res) => {
    db.query('SELECT * FROM products WHERE isbn = ?', [req.params.isbn], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//UPDATE
app.put('/products/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { title, author, genre, publisher, price, stock, image, description } = req.body;
    db.query('UPDATE products SET title = ?, author = ?, genre = ?, publisher = ?, price = ?, stock = ?, image = ?, description = ? WHERE isbn = ?', [title, author, genre, publisher, price, stock, image, description, isbn], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//DELETE
app.delete('/products/:isbn', (req, res) => {
    const { isbn } = req.params;
    db.query('DELETE FROM products WHERE isbn = ?', [isbn], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});