const express = require('express');
const ventasController = require('../controllers/ventasController');

const router = express.Router();

// POST endpoint para procesar ventas
router.post('/ventas', ventasController.procesarVenta);

module.exports = router;
