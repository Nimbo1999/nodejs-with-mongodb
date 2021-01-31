require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const CONFIG_CONSTANTS = require('./util/configure.constants');

const ProductsRoutes = require('./routes/products');
const UsersRoutes = require('./routes/users');

const app = express();

app.use(express.json({}));

app.use('/products', ProductsRoutes);
app.use('/users', UsersRoutes);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        version: CONFIG_CONSTANTS.VERSION,
        app_name: CONFIG_CONSTANTS.APP_NAME
    });
});

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

mongoose
    .connect(
        `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        app.listen(CONFIG_CONSTANTS.PORT, CONFIG_CONSTANTS.HOST,
            () => CONFIG_CONSTANTS.INITIAL_CALLBACK(CONFIG_CONSTANTS.PORT, CONFIG_CONSTANTS.HOST)
        );
    })
    .catch(err => {
        console.log(err);
    });
