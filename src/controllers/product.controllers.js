const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { productModel } = require('../model');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

// USERS prototype productModels

const sellersFilePath = path.resolve(__dirname, '../data/sellers.json');
function sellers() {
	return JSON.parse(fs.readFileSync(sellersFilePath, 'utf-8'));
}

const controller = {
	getList: function (req, res) {
		const productos = productModel.getSomeProducts((product) =>
			req.session.sellerLogged.products.includes(product.id)
		);
		res.render(pathViews('list'), {
			productos,
		});
	},

	getCatalog: function (req, res) {
		const frutas = productModel.getSomeProducts(
			(product) => product.category.includes('frutas') || product.category.includes('Frutas')
		);
		const verduras = productModel.getSomeProducts(
			(product) => product.category.includes('verduras') || product.category.includes('Verduras')
		);
		const condimentos = productModel.getSomeProducts(
			(product) => product.category.includes('condimentos') || product.category.includes('Condimentos')
		);
		res.render(pathViews('catalog'), {
			frutas,
			verduras,
			condimentos,
		});
	},

	getEdit: function (req, res) {
		const id = req.params.id;
		const product = productModel.getOne(id);
		res.render(pathViews('edit-item'), { product });
	},

	updateItem: function (req, res) {
		productModel.editProduct(req);
		res.redirect('/products/detail/' + req.params.id);
	},

	getAdd: function (req, res) {
		res.render(pathViews('add-item'));
	},

	createItem: function (req, res) {
		const errors = validationResult(req); // validación de creación.
		if (errors.isEmpty()) {
			productModel.storeProduct(req);
			res.redirect('list');
		} else {
			res.render(pathViews('add-item'), {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
	},

	getDetail: function (req, res) {
		const id = req.params.id;
		let i = 0;
		const product = productModel.getOne(id);
		// make a new array with just the items that I need suggest
		const suggestProducts = productModel.getSomeProducts((item) => {
			// principal condition, it'll be part of the same category
			if (i < 4 && item.category[0] === product.category[0] && item.id !== id) {
				i++;
				return item;
			}
		});
		const extraSuggest = productModel.getSomeProducts((item) => {
			// if we don't have enought to fill the space to four add some products from other categories
			if (i < 4 && item.category[0] !== product.category[0]) {
				i++;
				return item;
			}
		});
		// I join both arrays
		extraSuggest.forEach((item) => {
			suggestProducts.push(item);
		});

		// Hay que aplicar acá algun metodo del modelo de usuarios
		const seller = sellers().find((sel) => sel.products.includes(id));

		res.render(pathViews('detail'), {
			product: product,
			suggest: suggestProducts,
			seller: seller,
		});
	},

	deleteItem: function (req, res) {
		const id = req.params.id;
		productModel.deleteProduct(id);

		res.redirect('list');
	},

	getShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
