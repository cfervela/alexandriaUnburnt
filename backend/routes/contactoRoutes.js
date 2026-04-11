const express = require('express');
const contactoController = require('../controllers/contactoController');

const router = express.Router();

// Crear/enviar un nuevo mensaje
router.post('/contacto', contactoController.crearMensaje);

// Obtener todos los mensajes (opcional - para admin)
router.get('/contacto', contactoController.obtenerMensajes);

// Obtener un mensaje específico
router.get('/contacto/:id', contactoController.obtenerMensajePorId);

// Eliminar un mensaje
router.delete('/contacto/:id', contactoController.eliminarMensaje);

module.exports = router;
