const path = require('path');
const fs = require('fs');
const model = require('../model/product.model');
const { validationResult } = require('express-validator');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

// PRODUCTS prototype models
// path of products JSON
const productsFilePath = path.resolve(__dirname, '../data/products.json');
// get all products in an array
function products() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}
// update the JSON of products with a new array of products
function updateProducts(products) {
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
}

// USERS prototype models

const sellersFilePath = path.resolve(__dirname, '../data/sellers.json');
function sellers() {
	return JSON.parse(fs.readFileSync(sellersFilePath, 'utf-8'));
}

//función que permite almacenar el producto nuevo con el id superior al mayor de data
function newId() {
	let ultimo = 0;
	products().forEach((product) => {
		if (product.id > ultimo) {
			ultimo = product.id;
		}
	});
	return parseInt(ultimo) + 1;
}

const controller = {
	getList: function (req, res) {
		productss = products().filter((product) => req.session.sellerLogged.products.includes(product.id));
		res.render(pathViews('list'), {
			productos: productss /*.filter(product => product.seller == req.seller)*/,
		});
	},

	getCatalog: function (req, res) {
		const frutas = products().filter(
			(product) => product.category.includes('frutas') || product.category.includes('Frutas')
		);
		const verduras = products().filter(
			(product) => product.category.includes('verduras') || product.category.includes('Verduras')
		);
		const condimentos = products().filter(
			(product) => product.category.includes('condimentos') || product.category.includes('Condimentos')
		);
		res.render(pathViews('catalog'), {
			frutas,
			verduras,
			condimentos,
		});
	},

	getEditItem: function (req, res) {
		const idReq = req.params.id;
		const product = model.getOne(idReq);
		res.render(pathViews('edit-item'), { product });
	},

	updateItem: function (req, res) {
		model.editProduct(req);
		res.redirect('/products/detail/' + req.params.id);
	},

	getAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},

	storeAddItem: function (req, res) {
		const resultValidation = validationResult(req); // validación de creación.
		if (resultValidation.errors.length > 0) {
			return res.render(pathViews('add-item'), {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
		const priceKilo = req.body.kilo;
		const priceUnidad = req.body.unidad;

		if ((priceKilo == 0 && priceUnidad > 0) || (priceKilo == null && priceUnidad > 0)) {
			wayToBuy = 1;
		} else if ((priceKilo > 0 && priceUnidad == 0) || (priceKilo > 0 && priceUnidad == null)) {
			wayToBuy = 0;
		} else if (priceKilo > 0 && priceUnidad > 0) {
			wayToBuy = 2;
		}
		const product = {
			id: newId(),
			name: req.body.name,
			price: {
				kilo: parseInt(req.body.kilo),
				unidad: parseInt(req.body.unidad),
			},
			discount: req.body.discount,
			category: [req.body.category],
			image: req.file.filename,
			market: req.body.market,
			seller: '',
			wayToBuy: wayToBuy,
		};
		let newProducts = products();
		newProducts.push(product);
		updateProducts(newProducts);

		res.redirect('list');
	},

	getDetail: function (req, res) {
		const id = req.params.id;
		const dataProducts = products();
		const suggestProducts = [];
		let i = 0;
		dataProducts.forEach((product) => {
			if (i < 4 && id != product.id) {
				suggestProducts.push(product);
				i++;
			}
		});
		const product = dataProducts.find((item) => item.id == id);
		const seller = sellers().find((sel) => sel.products.includes(id));

		res.render(pathViews('detail'), {
			product: product,
			suggest: suggestProducts,
			seller: seller,
		});
	},

	deleteItem: function (req, res) {
		const idToDelete = req.params.id;
		const newProductsList = products().filter((product) => product.id != idToDelete);

		const jsonProducts = JSON.stringify(newProductsList, null, 4);
		fs.writeFileSync(productsFilePath, jsonProducts);

		res.redirect('list');
	},

	getShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
