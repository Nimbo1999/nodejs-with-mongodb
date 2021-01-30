const ProductToResponse = product => {
    const { _doc: { _id, __v, ...rest } } = product;

    return {
        id: _id,
        ...rest
    }
}

const ProductFromRequest = product => {
    const { id, ...rest } = product;

    return {
        _id: id,
        ...rest
    }
}

module.exports = { ProductToResponse, ProductFromRequest };
