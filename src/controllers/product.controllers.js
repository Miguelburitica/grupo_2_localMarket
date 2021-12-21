const path = require('path');
const fs = require('fs');
const model = require('../model/product.model');
const { validationResult } = require('express-validator');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const sellersFilePath = path.resolve(__dirname, '../data/sellers.json');
const sellers = JSON.parse(fs.readFileSync(sellersFilePath, 'utf-8'));

//función que permite almacenar el producto nuevo con el id superior al mayor de data

function newId() {
	let ultimo = 0;
	products.forEach((product) => {
		if (product.id > ultimo) {
			ultimo = product.id;
		}
	});
	return ultimo + 1;
}

const controller = {
	showList: function (req, res) {
		productss = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render(pathViews('list'), {
			products: productss /*.filter(product => product.seller == req.seller)*/,
		});
	},

	showCatalog: function (req, res) {

		const frutas = products.filter(
			(product) => product.category.includes('frutas') || product.category.includes('Frutas')
		);
		const verduras = products.filter(
			(product) => product.category.includes('verduras') || product.category.includes('Verduras')
		);
		const condimentos = products.filter(
			(product) => product.category.includes('condimentos') || product.category.includes('Condimentos')
		);
		res.render(pathViews('catalog'), {
			frutas,
			verduras,
			condimentos,
		});
	},

	showEditItem: function (req, res) {
		const idReq = req.params.id;
		const prodReq = products.find(function (item) {
			return item.id == idReq;
		});
		res.render(pathViews('edit-item'), { prodReq });
	},

	updateItem: function (req, res) {
		model.edit_products(req);
		res.redirect('/products/detail/' + idReqs);
	},

	showAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},

	storeAddItem: function (req, res) {
		const resultValidation = validationResult(req);// validación de creación.
		if (resultValidation.errors.length > 0) {
            return res.render(pathViews('add-item'), {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
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

		products.push(product);
		const jsonProducts = JSON.stringify(products, null, 4);
		fs.writeFileSync(productsFilePath, jsonProducts);

		res.redirect('list');
	},

	showDetail: function (req, res) {
		const id = req.params.id;
		const dataProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const suggestProducts = dataProducts.filter((item) => item.id > 1 && item.id < 6);
		const product = dataProducts.find((item) => item.id == id);
		const seller = sellers.find((seller) => {
			if (seller.product !== undefined) {
				seller.products.includes(product.id);
			} else {
				seller = undefined;
			}
		});

		res.render(pathViews('detail'), {
			product: product,
			suggest: suggestProducts,
			seller: seller,
		});
	},

	deleteItem: function (req, res) {
		const idToDelete = req.params.id;
		const newProductsList = products.filter((product) => product.id != idToDelete);

		const jsonProducts = JSON.stringify(newProductsList, null, 4);
		fs.writeFileSync(productsFilePath, jsonProducts);

		res.redirect('list');
	},

	showShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
