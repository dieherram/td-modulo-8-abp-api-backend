const { Category, Product } = require('../models');
const { sendSuccess, sendError } = require('../utils/response');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: 'products' }]
    });

    return sendSuccess(res, 200, 'Categorías obtenidas', { categories });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!category) {
      return sendError(res, 404, 'Categoría no encontrada');
    }

    return sendSuccess(res, 200, 'Categoría obtenida', { category });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return sendError(res, 409, 'Ya existe una categoría con ese nombre');
    }

    const category = await Category.create({ name, description });

    return sendSuccess(res, 201, 'Categoría creada exitosamente', { category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return sendError(res, 404, 'Categoría no encontrada');
    }

    const { name, description } = req.body;
    await category.update({ name, description });

    return sendSuccess(res, 200, 'Categoría actualizada', { category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return sendError(res, 404, 'Categoría no encontrada');
    }

    const productsCount = await Product.count({ where: { categoryId: category.id } });
    if (productsCount > 0) {
      return sendError(res, 400, 'No se puede eliminar una categoría con productos asociados');
    }

    await category.destroy();

    return sendSuccess(res, 200, 'Categoría eliminada');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
