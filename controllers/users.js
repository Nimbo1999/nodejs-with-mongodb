const Mongoose = require('mongoose');
const User = require('../models/User');
const Products = require('../models/Product');
const Orders = require('../models/Order');

const { UserFromRequest, UserToResponse } = require('../adapters/users');

const { mongooseError } = require('../exceptions/Mongoose.exception');

exports.save = (req, res) => {
    const user = new User(UserFromRequest(req.body));

    user.save()
    .then(user => res.send(UserToResponse(user)))
    .catch(err => {
        console.log(err);
        res.send('error');
    })
};

exports.update = (req, res) => {
    const user = UserFromRequest(req.body);

    User.findByIdAndUpdate(user._id, user, { useFindAndModify: false, new: true })
    .then(newUser => res.send(UserToResponse(newUser)))
    .catch(err => {
        console.log(err);
        res.status(500).send({error: true, content: err.message});
    })
}

exports.fetchAll = (_, res) => {

    User.find().then(users => res.send(users.map(UserToResponse)))
    .catch(err => {
        console.log(err);
        res.send('error');
    });
};

exports.findById = (req, res) => {
    
    User.findById(req.params.id).then(user => res.send(UserToResponse(user)))
    .catch(err => {
        console.log(err);
        res.status(404).send({ error: true, content: err.message });
    });
};

exports.addToCart = async (req, res) => {
    const user = new User(await User.findById(req.body.userId));
    user.addToCart(await Products.findById(req.body.productId)).then(user => {
        res.send(UserToResponse(user));
    })
    .catch(err => {
        if (err instanceof Mongoose.Error) res.status(400).send(mongooseError(err));
        else res.status(400).send({ error: err });
    });


};

exports.getCart = (req, res) => {
    User.findById(req.params.id).populate('cart.items.productId').then(user => {
        console.log(user);
        res.send(user.cart);
    })
}

exports.removeItemFromCart = (req, res) => {
    User.findById(req.params.userId, (err, adventure) => {
        if (err) {
            if (err instanceof Mongoose.Error) res.status(400).send(mongooseError(err));
            else res.status(400).send({ error: err });
        }

        adventure.removeFromCart(req.params.productId).then(result => {
            res.send(UserToResponse(result));
        });
    })
}

exports.createOrder = async (req, res) => {
    const user = await new User(UserFromRequest(req.body)).populate('cart.items.productId').execPopulate();
    const products = [];

    user.cart.items.forEach(item => {
        products.push({product: { ...item.productId._doc }, quantity: item.quantity });
    });

    const order = new Orders({
        user: user._id,
        products
    });

    order.save().then(result => {
        user.clearCart().then(() => {
            res.send(result);
        })
        .catch(err => {
            if (err) {
                if (err instanceof Mongoose.Error) res.status(400).send(mongooseError(err));
                else res.status(400).send({ error: err });
            }
        });
    })
    .catch(err => {
        if (err) {
            if (err instanceof Mongoose.Error) res.status(400).send(mongooseError(err));
            else res.status(400).send({ error: err });
        }
    })
}
