const { Router } = require('express');
const ProductsController = require('../controllers/products');

const Route = Router();

Route.post('/', ProductsController.postProduct);

Route.get('/', ProductsController.getAllProducts);

Route.get('/:id', ProductsController.getOneProduct);

Route.put('/', ProductsController.updateProduct);

Route.delete('/:id', ProductsController.deleteProduct);

module.exports = Route;
