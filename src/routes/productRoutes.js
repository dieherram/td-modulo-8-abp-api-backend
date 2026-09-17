const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verificarToken } = require('../middlewares/auth');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verificarToken, createProduct);
router.put('/:id', verificarToken, updateProduct);
router.delete('/:id', verificarToken, deleteProduct);

module.exports = router;
