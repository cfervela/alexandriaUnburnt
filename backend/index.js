const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(productRoutes);

// Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
