const Product = require('../models/Product');

exports.postProduct = async (req, res) => {
    const product = new Product(req.body);
    res.send(await product.saveOrUpdate());
};

exports.getAllProducts = async (_, res) => {
    const products = await Product.fetchAll();
    res.send({ products });
};

exports.getOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send({ product });
};

exports.updateProduct = async (req, res) => {
    const product = new Product(req.body);
    res.send(await product.saveOrUpdate());
};

exports.deleteProduct = async (req, res) => {
    const response = await Product.deleteById(req.params.id)
    res.send(response);
};
