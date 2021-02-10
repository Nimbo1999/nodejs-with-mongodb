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

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp =>
        cp.productId.toString() === product._id.toString());
    
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity,
        });
    }

    const updatedCart = {
        items: updatedCartItems,
    }

    this.cart = updatedCart;

    return this.save();
}

module.exports = model('User', userSchema)
