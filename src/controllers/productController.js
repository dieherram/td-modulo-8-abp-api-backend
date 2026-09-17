const { Product, User, Category } = require('../models');
const { sendSuccess, sendError } = require('../utils/response');
const { Op } = require('sequelize');

const getAllProducts = async (req, res, next) => {
  try {
    const { search, categoryId, minPrice, maxPrice } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    const products = await Product.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Category, as: 'category' }
      ]
    });

    return sendSuccess(res, 200, 'Productos obtenidos', { products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Category, as: 'category' }
      ]
    });

    if (!product) {
      return sendError(res, 404, 'Producto no encontrado');
    }

    return sendSuccess(res, 200, 'Producto obtenido', { product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      userId: req.user.id,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const productWithRelations = await Product.findByPk(product.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Category, as: 'category' }
      ]
    });

    return sendSuccess(res, 201, 'Producto creado exitosamente', { product: productWithRelations });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return sendError(res, 404, 'Producto no encontrado');
    }

    if (product.userId !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 403, 'No tienes permiso para editar este producto');
    }

    const { name, description, price, stock, categoryId } = req.body;
    const updateData = { name, description, price, stock, categoryId };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    await product.update(updateData);

    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Category, as: 'category' }
      ]
    });

    return sendSuccess(res, 200, 'Producto actualizado', { product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return sendError(res, 404, 'Producto no encontrado');
    }

    if (product.userId !== req.user.id && req.user.role !== 'admin') {
      return sendError(res, 403, 'No tienes permiso para eliminar este producto');
    }

    await product.destroy();

    return sendSuccess(res, 200, 'Producto eliminado');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
