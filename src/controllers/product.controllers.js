const path = require('path');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

const controller = {
	// Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.
	showCreateEdit: function (req, res) {
		res.render(pathViews('create-edit'));
	},

	showAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},
	showProductDetail: function (req, res) {
		res.render(pathViews('detail'));
	},

	showShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
