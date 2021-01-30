const Product = require('../models/Product');
const { ProductToResponse, ProductFromRequest } = require('../adapters/products');

exports.postProduct = async (req, res) => {
    const product = new Product(req.body);
    res.send(ProductToResponse(await product.save()));
};

exports.getAllProducts = async (_, res) => {
    const fetchedProducts = await Product.find();

    const products = fetchedProducts.map(product => ProductToResponse(product));

    res.send({ products });
};

exports.getOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send({ product: ProductToResponse(product) });
};

exports.updateProduct = (req, res) => {

    const responseProduct = ProductFromRequest(req.body);

    Product.findById(responseProduct._id).then(async product => {

        product.title = responseProduct.title;
        product.price = responseProduct.price;
        product.description = responseProduct.description;
        product.imageUrl = responseProduct.imageUrl;
        
        res.send(ProductToResponse(await product.save()));
    }).catch(err => {
        res.send('error');
        console.log(err);
    });
};

exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id, { useFindAndModify: false }).then(result => {
        res.send(ProductToResponse(result));
    }).catch(err => {
        res.send('error');
        console.log(err);
    });
};
