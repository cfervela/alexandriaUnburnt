const express = require('express');
const contactoController = require('../controllers/contactoController');
const { validarCrearMensaje } = require('../middlewares/validarContactoMiddleware');

const router = express.Router();

// Crear/enviar un nuevo mensaje
router.post('/contacto', validarCrearMensaje, contactoController.crearMensaje);

// Obtener todos los mensajes
router.get('/contacto', contactoController.obtenerMensajes);

// Obtener un mensaje específico
router.get('/contacto/:id', contactoController.obtenerMensajePorId);

// Eliminar un mensaje
router.delete('/contacto/:id', contactoController.eliminarMensaje);

module.exports = router;
