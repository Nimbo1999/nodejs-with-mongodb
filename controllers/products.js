const Mongoose = require('mongoose');
const Product = require('../models/Product');
const { ProductToResponse, ProductFromRequest } = require('../adapters/products');

exports.save = (req, res) => {
    const product = new Product(req.body);
    product.save().then(doc => {
        res.send(ProductToResponse(doc));
    })
    .catch(err => {
        if (err instanceof Mongoose.Error) {
            const { errors } = err;

            for(key in errors) {
                const { message, type, path } = errors[key].properties;
                res.status(400).send({ message, type, path });
                break;
            }
        } else {
            res.status(400).send({ error: err });
        }

    })
};

exports.fetchAll = async (_, res) => {
    const fetchedProducts = await Product.find();

    const products = fetchedProducts.map(product => ProductToResponse(product));

    res.send({ products });
};

exports.findById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    // .populate('userId');
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
