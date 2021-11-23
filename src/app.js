const express = require('express');
const path = require('path');

const mainRoutes = require('./routes');

const app = express();
const methodOverride = require('method-override');

app.use(express.static(path.resolve(__dirname, '../public')));

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//para poder traer datos de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))

// GET the main routes
app.use('/', mainRoutes);

module.exports = app;
