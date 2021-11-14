const path = require('path');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../../views/users/' + nameView + '.ejs');
};

const controller = {
	// Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.
	showSellerProfile: function (req, res) {
		res.render(pathViews('seller'));
	},

	showLogin: function (req, res) {
		res.render(pathViews('login'));
	},

	showSignIn: function (req, res) {
		res.render(pathViews('sign-in'));
	},
};

module.exports = controller;
