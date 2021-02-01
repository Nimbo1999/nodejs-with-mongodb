const Product = require('../models/Product');
const { ProductToResponse, ProductFromRequest } = require('../adapters/products');

exports.save = async (req, res) => {
    const product = new Product(req.body);
    res.send(ProductToResponse(await product.save()));
};

exports.fetchAll = async (_, res) => {
    const fetchedProducts = await Product.find();

    const products = fetchedProducts.map(product => ProductToResponse(product));

    res.send({ products });
};

exports.findById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(ProductToResponse(product));
};

exports.update = (req, res) => {

    const responseProduct = ProductFromRequest(req.body);

    Product.findByIdAndUpdate(responseProduct._id, responseProduct, { useFindAndModify: false, new: true })
    .then(product => res.send(ProductToResponse(product)))
    .catch(err => {
        res.send('error');
        console.log(err);
    });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, { useFindAndModify: false }).then(result => {
        res.send(ProductToResponse(result));
    }).catch(err => {
        res.send('error');
        console.log(err);
    });
};
