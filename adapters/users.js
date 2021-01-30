const User = user => {
    const { _id, ...rest } = user;

    return {
        id: _id,
        ...rest
    }
}

module.exports = User;
