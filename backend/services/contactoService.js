const pool = require('../config/database');

// Guardar mensaje de contacto
const guardarMensaje = async (nombre, correo, asunto, mensaje) => {
  try {
    const query = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [nombre, correo, asunto, mensaje]);
    return {
      success: true,
      id: result.insertId,
      message: 'Mensaje guardado exitosamente'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al guardar el mensaje',
      error: error.message
    };
  }
};

// Obtener todos los mensajes
const obtenerMensajes = async () => {
  try {
    const query = 'SELECT * FROM mensajes ORDER BY fecha_envio DESC';
    const [rows] = await pool.query(query);
    return {
      success: true,
      data: rows
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener mensajes',
      error: error.message
    };
  }
};

// Obtener un mensaje por ID
const obtenerMensajePorId = async (id) => {
  try {
    const query = 'SELECT * FROM mensajes WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    if (rows.length === 0) {
      return {
        success: false,
        message: 'Mensaje no encontrado'
      };
    }
    return {
      success: true,
      data: rows[0]
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener el mensaje',
      error: error.message
    };
  }
};

// Eliminar mensaje
const eliminarMensaje = async (id) => {
  try {
    const query = 'DELETE FROM mensajes WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) {
      return {
        success: false,
        message: 'Mensaje no encontrado'
      };
    }
    return {
      success: true,
      message: 'Mensaje eliminado exitosamente'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el mensaje',
      error: error.message
    };
  }
};

module.exports = {
  guardarMensaje,
  obtenerMensajes,
  obtenerMensajePorId,
  eliminarMensaje
};
