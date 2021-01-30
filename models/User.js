const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

const UserAdapter = require('../adapters/users');

class User {
    constructor({ id, fullName, email }) {
        this._id = id ? new ObjectId(id) : undefined;
        this.fullName = fullName;
        this.email = email;
    }
    
    saveOrUpdate() {
        const db = getDb();

        if (this._id) {

            return db.collection('users').updateOne({
                _id: this._id
            }, {
                $set: this,
                $currentDate: { lastModified: true }
            })
                .then(() => UserAdapter(this))
                .catch(err => {
                    console.log(err);
                    throw err;
                });

        } else {

            return db.collection('users').insertOne(this)
                .then(result => {
                    return UserAdapter(result.ops[0]);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });

        }

    }

    static fetchAll() {
        const db = getDb();

        return db.collection('users').find().toArray()
            .then(users => users.map(user => UserAdapter(user)))
            .catch(err => {
                console.log(err)
                throw err;
            });
    }

    static findById(id) {
        const db = getDb();

        return db.collection('users').find({ _id: new ObjectId(id) }).next()
            .then(user => UserAdapter(user))
            .catch(err => {
                throw err;
            })


    }

}

module.exports = User;
