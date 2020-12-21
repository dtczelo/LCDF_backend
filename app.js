const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const path = require("path");
const usersRoutes = require('./routes/users');

const app = express();

app.use(helmet());

mongoose.connect(process.env.DB_MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(() => console.error('Erreur lors de la connexion à MongoDB'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

module.exports = app;