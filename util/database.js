const { MongoClient } = require('mongodb');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

let _db;

const client = new MongoClient(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true });

const MongoConnect = callback => {
    client.connect(err => {
        if (err) throw err;

        _db = client.db();
        console.log('connected to MongoDB.');
        callback();
    });
}

const getDb = () => {

    if (_db) return _db;

    throw 'No database found!';

}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;