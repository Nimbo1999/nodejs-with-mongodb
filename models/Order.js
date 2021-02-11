const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    products: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true }
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

module.exports = model('Order', orderSchema);
