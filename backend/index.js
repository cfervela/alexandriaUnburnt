const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alexandria'
});

// CREATE
app.post('/products', (req, res) => {
    const { title, author, genre, publisher, price, stock, image, description } = req.body;
    db.query('INSERT INTO products (title, author, genre, publisher, price, stock, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, author, genre, publisher, price, stock, image, description], (err, result) => {
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
app.get('/products/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//UPDATE
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publisher, price, stock, image, description } = req.body;
    db.query('UPDATE products SET title = ?, author = ?, genre = ?, publisher = ?, price = ?, stock = ?, image = ?, description = ? WHERE id = ?', [title, author, genre, publisher, price, stock, image, description, id], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

//DELETE
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return console.log(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});