const MongoClient = require('mongodb').MongoClient;

let _db;

const client = new MongoClient(
    'mongodb+srv://nodejs-application:Matlindo3-@clustes-de-testes.njrgo.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true });

const MongoConnect = callback => {
    client.connect(err => {
        if (err) throw err;

        _db = client.db();
        console.log('connected, result of err => ');
        callback();
    });
}

const getDb = () => {

    if (_db) return _db;

    throw 'No database found!';

}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;