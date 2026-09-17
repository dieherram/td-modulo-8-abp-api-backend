const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { verificarToken, autorizar } = require('../middlewares/auth');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', verificarToken, autorizar('admin'), createCategory);
router.put('/:id', verificarToken, autorizar('admin'), updateCategory);
router.delete('/:id', verificarToken, autorizar('admin'), deleteCategory);

module.exports = router;
