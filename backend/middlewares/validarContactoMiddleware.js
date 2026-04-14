const getTrimmedText = (value) => (typeof value === 'string' ? value.trim() : '');

const validarCrearMensaje = (req, res, next) => {
  const nombre = getTrimmedText(req.body?.nombre);
  const correo = getTrimmedText(req.body?.correo);
  const asunto = getTrimmedText(req.body?.asunto);
  const mensaje = getTrimmedText(req.body?.mensaje);

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  if (!correo) {
    return res.status(400).json({ error: 'El correo es requerido' });
  }

  if (!asunto) {
    return res.status(400).json({ error: 'El asunto es requerido' });
  }

  if (!mensaje) {
    return res.status(400).json({ error: 'El mensaje es requerido' });
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(correo)) {
    return res.status(400).json({ error: 'El correo no es válido' });
  }

  req.body.nombre = nombre;
  req.body.correo = correo;
  req.body.asunto = asunto;
  req.body.mensaje = mensaje;

  return next();
};

module.exports = {
  validarCrearMensaje,
};
