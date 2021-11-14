const path = require('path');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../../views/products/' + nameView + '.ejs');
};
const data = require('../../data/products.json');

const controller = {
	// Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.
	showCreateEdit: function (req, res) {
		res.render(pathViews('create-edit'));
	},

	showEditItem: function (req, res) {
		res.render(pathViews('edit-item'));
	},

	showAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},

	showDetail: function (req, res) {
		const id = req.params.id;
		const product = data.find((item) => item.id == id);
		res.render(pathViews('detail'), { product });
	},

	showShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
