const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

module.exports = model('Product', productSchema);

// const { ObjectId } = require('mongodb');

// const { getDb } = require('../util/database');

// const ProductsAdapter = require('../adapters/products');

// class Product {
//     constructor({ id, title, price, description, imageURL, userId}) {
//         this._id = id ? new ObjectId(id) : undefined;
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageURL = imageURL;
//         this.userId = userId ? new ObjectId(userId) : undefined;
//     }

//     saveOrUpdate() {
//         const db = getDb();

//         if (this._id) {

//             return db.collection('products').updateOne(
//                 { _id: this._id },
//                 {
//                     $set: this,
//                     $currentDate: { lastModified: true }
//                 },
//             ).then(() => {
//                 return ProductsAdapter(this);
//             }).catch(err => {
//                 console.log(err);
//             });

//         } else {

//             return db.collection('products').insertOne(this)
//             .then(result => {
//                 return ProductsAdapter(result.ops[0]);
//             })
//             .catch(err => {
//                 console.log(err);
//             });;

//         }

//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//             .then(products => products.map(product => ProductsAdapter(product)))
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static findById(id) {
//         const db = getDb();
//         return db.collection('products').find({ _id: new ObjectId(id) }).next()
//             .then(product => ProductsAdapter(product))
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static deleteById(id) {
//         const db = getDb();
//         db.collection('products').deleteOne({ _id: new ObjectId(id) })
//             .then(() => {
//                 return { sucess: true }
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }

// module.exports = Product;
