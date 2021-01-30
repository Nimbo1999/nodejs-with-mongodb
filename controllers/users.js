const User = require('../models/User');

exports.saveOrUpdate = async (req, res) => {
    const user = new User(req.body);
    res.send(await user.saveOrUpdate());
};

exports.fetchAll = async (_, res) => {
    res.send(await User.fetchAll());
};

exports.findById = async (req, res) => {
    const id = req.params.id;
    res.send(await User.findById(id));
};
