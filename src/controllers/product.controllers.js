const path = require('path');
const fs = require('fs');
const model = require('../model/product.model');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

const productsFilePath = path.resolve(__dirname, '../data/products.json');
const products = function () {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const sellersFilePath = path.resolve(__dirname, '../data/sellers.json');
const sellers = function () {
	return JSON.parse(fs.readFileSync(sellersFilePath, 'utf-8'));
};
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
	// Cuando cambies las funciones de arriba, deberás cambiar el metodo que muestra las vistas, deberá pasar de sendFile a render.
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
		const product = model.getOne(idReq);
		res.render(pathViews('edit-item'), { product });
	},

	updateItem: function (req, res) {
		model.edit_products(req);
		res.redirect('/products/detail/' + req.params.id);
	},

	showAddItem: function (req, res) {
		res.render(pathViews('add-item'));
	},

	storeAddItem: function (req, res) {
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
		console.log(sellers());
		sellers().forEach((seller) => {
			console.log(id);
			console.log(seller.products.includes(id));
		});
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

	showShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
