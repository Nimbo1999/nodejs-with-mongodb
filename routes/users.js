const { Router } = require('express');
const UserController = require('../controllers/users');

const userRoutes = Router();

userRoutes.post('/', UserController.save);

userRoutes.put('/', UserController.update);

userRoutes.get('/', UserController.fetchAll);

userRoutes.get('/:id', UserController.findById);

userRoutes.post('/cart', UserController.addToCart);

module.exports = userRoutes;
