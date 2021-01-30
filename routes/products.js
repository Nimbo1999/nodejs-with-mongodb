const express = require('express');
const ProductsController = require('../controllers/products');

const Route = express.Router();

Route.post('/', ProductsController.postProduct);

Route.get('/', ProductsController.getAllProducts);

Route.get('/:id', ProductsController.getOneProduct);

Route.put('/:id', ProductsController.updateProduct);

Route.delete('/:id', ProductsController.deleteProduct);

module.exports = Route;
