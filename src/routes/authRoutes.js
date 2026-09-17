const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { verificarToken } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verificarToken, getProfile);

module.exports = router;
