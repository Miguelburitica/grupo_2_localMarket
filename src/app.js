const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');

const mainRoutes = require('./routes');

const app = express();
const methodOverride = require('method-override');

app.use(express.static(path.resolve(__dirname, '../public')));

//para poder traer datos de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const { userLoggedMiddleware } = require('./middlewares');

app.use(
	session({
		secret: '¡Es secreto!',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookies());
app.use(userLoggedMiddleware);

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// GET the main routes
app.use('/', mainRoutes);

module.exports = app;
