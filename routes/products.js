const { Router } = require('express');
const ProductsController = require('../controllers/products');

const Route = Router();

Route.post('/', ProductsController.save);

Route.get('/', ProductsController.fetchAll);

Route.get('/:id', ProductsController.findById);

Route.put('/', ProductsController.update);

Route.delete('/:id', ProductsController.delete);

module.exports = Route;
