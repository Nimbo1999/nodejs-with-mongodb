const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
                quantity: { type: Schema.Types.Number, required: true }
            }
        ],
        required: false
    }
});

module.exports = model('User', userSchema)
