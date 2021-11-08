const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/main.routes');
const productsRoutes = require('./routes/product.routes');
const usersRoutes = require('./routes/user.routes');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// GET the main routes
app.use('/', mainRoutes);

// GET the products routes
app.use('/products', productsRoutes);

// GET the users routes
app.use('/users', usersRoutes);

module.exports = app;
