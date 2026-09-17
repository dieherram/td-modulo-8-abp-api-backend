const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendSuccess, sendError } = require('../utils/response');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, 409, 'El email ya está registrado');
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    return sendSuccess(res, 201, 'Usuario registrado exitosamente', {
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email y contraseña son requeridos');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 401, 'Credenciales inválidas');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return sendError(res, 401, 'Credenciales inválidas');
    }

    const token = generateToken(user);

    return sendSuccess(res, 200, 'Inicio de sesión exitoso', {
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, 'Perfil obtenido', { user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
