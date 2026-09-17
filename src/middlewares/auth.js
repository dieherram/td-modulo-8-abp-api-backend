const jwt = require('jsonwebtoken');
const { User } = require('../models');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    req.usuario = user;
    next();
  });
}

function autorizar(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
    }
    next();
  };
}

module.exports = { verificarToken, autorizar };
