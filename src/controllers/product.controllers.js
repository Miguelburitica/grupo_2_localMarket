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
function updateSellers(sellers) {
	let jsonSellers = JSON.stringify(sellers, null, 4);
	fs.writeFileSync(sellersFilePath, jsonSellers);
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
			// Aquí implementaré el cómo se agrega un producto teniendo en cuenta el usuario asociado
			if (req.session.sellerLogged !== undefined) {
				// modelo que creará el nuevo producto en el JSON de productos
				productModel.storeProduct(req);

				// capturo el array de productos actuales del vendedor logueado
				let userProducts = req.session.sellerLogged.products;

				// le agredo el id que recien se ingresó
				userProducts.push(productModel.lastId());

				// capturo toda la lista de vendedores que hay
				let sellersList = sellers();

				// recorro el array de vendedores buscando el vendedor logueago
				sellersList.forEach((seller) => {
					// compruebo el vendedor por su email, ya que debe ser único
					if (seller.email === req.session.sellerLogged.email) {
						// remplazo el array de productos que tenía por el nuevo, el cual tiene agregado el nuevo producto
						seller.products = userProducts;
					}
				});

				// actualizo la lista de vendedores con el cambió al vendedor logueado en su array de productos
				updateSellers(sellersList);

				// redirijo a la lista de productos
				res.redirect('list');
			} else {
				// si llega a acabarse la sesión antes de crear el producto le enviará este mensaje de apoyo :3
				res.send('Chic@ no deberías estar viendo esto >:°');
			}
			// en caso de que hayan errores, redirije al formulario de crear item, para crearlo bien
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

		if (req.session.sellerLogged !== undefined) {
			// !!!!! TEMPORAL !!!!!
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
			// Hay que aplicar acá algun metodo del modelo de usuarios (¿cuál?)
			const seller = sellers().find((sel) => sel.products.includes(id));

			res.render(pathViews('detailCustomer'), {
				product: product,
				suggest: suggestProducts,
				seller: seller,
			});
		} else {
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
			// Hay que aplicar acá algun metodo del modelo de usuarios (¿cuál?)
			const seller = sellers().find((sel) => sel.products.includes(id));

			res.render(pathViews('detailCustomer'), {
				product: product,
				suggest: suggestProducts,
				seller: seller,
			});
		}
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
