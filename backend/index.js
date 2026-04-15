const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const contactoRoutes = require('./routes/contactoRoutes');
const ventasRoutes = require('./routes/ventasRoutes');

const app = express();

const allowedOrigins = [
  'https://cfervela.github.io',
  'https://alegria-home-dev.duckdns.org',
  'http://localhost:4200',
  'http://localhost:8081',
  'http://127.0.0.1:8081',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use(productRoutes);
app.use(contactoRoutes);
app.use(ventasRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
