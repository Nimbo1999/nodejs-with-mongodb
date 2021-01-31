const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    description: {
        type: Schema.Types.String,
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
    },
});

module.exports = model('Product', productSchema);
