const User = require('../models/User');
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
