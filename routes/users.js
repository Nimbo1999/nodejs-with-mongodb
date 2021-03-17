const { Router } = require('express');
const UserController = require('../controllers/users');

const userRoutes = Router();

userRoutes.post('/', UserController.save);

userRoutes.put('/', UserController.update);

userRoutes.get('/', UserController.fetchAll);

userRoutes.get('/:id', UserController.findById);

userRoutes.post('/cart', UserController.addToCart);

userRoutes.get('/cart/:id', UserController.getCart);

userRoutes.delete('/:userId/cart/:productId', UserController.removeItemFromCart);

userRoutes.post('/order', UserController.createOrder);

userRoutes.get('/orders/:id', UserController.getOrders);

module.exports = userRoutes;
