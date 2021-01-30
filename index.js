require('dotenv').config();

const express = require('express');

const { MongoConnect } = require('./util/database');
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
    })
});

MongoConnect(() => {
    app.listen(
        CONFIG_CONSTANTS.PORT,
        CONFIG_CONSTANTS.HOST,
        () => CONFIG_CONSTANTS.INITIAL_CALLBACK(CONFIG_CONSTANTS.HOST, CONFIG_CONSTANTS.PORT)
    );
});
