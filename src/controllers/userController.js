const { User, Product } = require('../models');
const { sendSuccess, sendError } = require('../utils/response');
const { Op } = require('sequelize');

const getAllUsers = async (req, res, next) => {
  try {
    const { search, role } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (role) {
      where.role = role;
    }

    const users = await User.findAll({
      where,
      include: [{ model: Product, as: 'products' }]
    });

    return sendSuccess(res, 200, 'Usuarios obtenidos', { users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!user) {
      return sendError(res, 404, 'Usuario no encontrado');
    }

    return sendSuccess(res, 200, 'Usuario obtenido', { user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return sendError(res, 404, 'Usuario no encontrado');
    }

    const { name, email, role } = req.body;
    await user.update({ name, email, role });

    return sendSuccess(res, 200, 'Usuario actualizado', { user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return sendError(res, 404, 'Usuario no encontrado');
    }

    await user.destroy();

    return sendSuccess(res, 200, 'Usuario eliminado');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
