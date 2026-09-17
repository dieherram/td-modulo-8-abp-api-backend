const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verificarToken, autorizar } = require('../middlewares/auth');

router.get('/', verificarToken, getAllUsers);
router.get('/:id', verificarToken, getUserById);
router.put('/:id', verificarToken, updateUser);
router.delete('/:id', verificarToken, autorizar('admin'), deleteUser);

module.exports = router;
