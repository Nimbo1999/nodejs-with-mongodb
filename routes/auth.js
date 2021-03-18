const { Router } = require('express');
const { postLogin } = require('../controllers/auth');

const authRoutes = Router();

authRoutes.get('/', postLogin);

module.exports = authRoutes;
