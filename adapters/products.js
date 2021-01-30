const Products = product => {
    const { _id, ...rest } = product;

    return {
        id: _id,
        ...rest
    }
}

module.exports = Products;
