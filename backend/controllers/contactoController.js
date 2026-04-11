const contactoService = require('../services/contactoService');

// Crear un nuevo mensaje de contacto
const crearMensaje = async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;

    // Validaciones
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    if (!correo || correo.trim() === '') {
      return res.status(400).json({ error: 'El correo es requerido' });
    }
    if (!asunto || asunto.trim() === '') {
      return res.status(400).json({ error: 'El asunto es requerido' });
    }
    if (!mensaje || mensaje.trim() === '') {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    // Validar formato de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(correo)) {
      return res.status(400).json({ error: 'El correo no es válido' });
    }

    // Guardar en BD
    const result = await contactoService.guardarMensaje(nombre, correo, asunto, mensaje);

    if (result.success) {
      return res.status(201).json({
        message: result.message,
        id: result.id
      });
    } else {
      return res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error en crearMensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los mensajes
const obtenerMensajes = async (req, res) => {
  try {
    const result = await contactoService.obtenerMensajes();
    if (result.success) {
      return res.status(200).json(result.data);
    } else {
      return res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error en obtenerMensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un mensaje por ID
const obtenerMensajePorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const result = await contactoService.obtenerMensajePorId(id);
    if (result.success) {
      return res.status(200).json(result.data);
    } else {
      return res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error en obtenerMensajePorId:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un mensaje
const eliminarMensaje = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const result = await contactoService.eliminarMensaje(id);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error en eliminarMensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearMensaje,
  obtenerMensajes,
  obtenerMensajePorId,
  eliminarMensaje
};
