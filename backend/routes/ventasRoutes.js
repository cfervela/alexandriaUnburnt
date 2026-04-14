const express = require('express');
const ventasController = require('../controllers/ventasController');
const { validarCarritoVenta } = require('../middlewares/validarVentaMiddleware');

const router = express.Router();

// POST endpoint para procesar ventas
router.post('/ventas', validarCarritoVenta, ventasController.procesarVenta);

module.exports = router;
