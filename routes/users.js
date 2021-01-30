const { Router } = require('express');
const UserController = require('../controllers/users');

const userRoutes = Router();

userRoutes.post('/', UserController.saveOrUpdate);

userRoutes.put('/:id', UserController.saveOrUpdate);

userRoutes.get('/', UserController.fetchAll);

userRoutes.get('/:id', UserController.findById);

module.exports = userRoutes;
