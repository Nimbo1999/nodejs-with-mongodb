const User = require('../models/User');
const Products = require('../models/Product');
const { UserFromRequest, UserToResponse } = require('../adapters/users');

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
    });


};

exports.getCart = (req, res) => {
    User.findById(req.params.id).populate('cart.items.productId').then(user => {
        console.log(user);
        res.send(user.cart);
    })
}
