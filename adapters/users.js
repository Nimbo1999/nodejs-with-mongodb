const UserToResponse = user => {
    const { _doc: { _id, __v, ...rest } } = user;

    return {
        id: _id,
        ...rest
    }
}

const UserFromRequest = user => {
    const { id, ...rest } = user;

    return {
        _id: id,
        ...rest
    }
}

module.exports = { UserToResponse, UserFromRequest };
