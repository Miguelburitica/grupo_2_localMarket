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
	getList: async function (req, res) {
		const productos = await productModel.getSomeProducts((product) =>
			req.session.sellerLogged.products.includes(product.id)
		);
		res.render(pathViews('list'), {
			productos,
		});
	},

	getCatalog: async function (req, res) {
		try {
			const frutas = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'frutas') {
					return product;
				}
			});

			if (frutas.original) {
				res.json(frutas);
			}
			const verduras = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'verduras') {
					return product;
				}
			});
			const condimentos = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'hortalizas') {
					return product;
				}
			});
			res.render(pathViews('catalog'), {
				frutas,
				verduras,
				condimentos,
			});
		} catch (err) {
			console.log(err);
		}
	},

	getEdit: async function (req, res) {
		const id = req.params.id;
		const product = await productModel.getOne(id);
		res.render(pathViews('edit-item'), { product });
	},

	updateItem: async function (req, res) {
		await productModel.editProduct(req);
		res.redirect('/products/detail/' + req.params.id);
	},

	getAdd: function (req, res) {
		res.render(pathViews('add-item'));
	},

	createItem: async function (req, res) {
		try {
			const errors = validationResult(req); // validación de creación.
			if (errors.isEmpty()) {
				// Aquí implementaré el cómo se agrega un producto teniendo en cuenta el usuario asociado
				if (req.session.sellerLogged !== undefined) {
					// modelo que creará el nuevo producto en el JSON de productos
					await productModel.storeProduct(req);

					// Para ser implementado es necesario el modelo de users

					// capturo el array de productos actuales del vendedor logueado
					// let userProducts = req.session.sellerLogged.products;

					// // le agredo el id que recien se ingresó
					// userProducts.push(productModel.lastId());

					// // capturo toda la lista de vendedores que hay
					// let sellersList = sellers();

					// // recorro el array de vendedores buscando el vendedor logueago
					// sellersList.forEach((seller) => {
					// 	// compruebo el vendedor por su email, ya que debe ser único
					// 	if (seller.email === req.session.sellerLogged.email) {
					// 		// remplazo el array de productos que tenía por el nuevo, el cual tiene agregado el nuevo producto
					// 		seller.products = userProducts;
					// 	}
					// });

					// // actualizo la lista de vendedores con el cambió al vendedor logueado en su array de productos
					// updateSellers(sellersList);

					// redirijo a la lista de productos
					res.redirect('list');
				} else {
					// si llega a acabarse la sesión antes de crear el producto le enviará este mensaje de apoyo :3
					res.send('Chic@ no deberías estar viendo esto >:°');
				}
				// en caso de que hayan errores, redirije al formulario de crear item, para crearlo bien
			} else {
				console.log(errors.mapped());
				res.render(pathViews('add-item'), {
					errors: errors.mapped(),
					oldData: req.body,
				});
			}
		} catch (err) {
			console.log(err);
		}
	},

	getDetail: async function (req, res) {
		try {
			const id = req.params.id;
			let i = 0;
			const product = await productModel.getOne(id);

			if (req.session.sellerLogged !== undefined) {
				// !!!!! TEMPORAL !!!!!
				const suggestProducts = await productModel.getSomeProducts((item) => {
					// principal condition, it'll be part of the same category
					if (i < 4 && item.category === product.category && item.id !== id) {
						i++;
						return item;
					}
				});
				const extraSuggest = await productModel.getSomeProducts((item) => {
					// if we don't have enought to fill the space to four add some products from other categories
					if (i < 4 && item.category !== product.category) {
						console.log(item);
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
				const suggestProducts = await productModel.getSomeProducts((item) => {
					// principal condition, it'll be part of the same category
					if (i < 4 && item.category.name === product.category.name && item.id != id) {
						i++;
						return item;
					}
				});

				const extraSuggest = await productModel.getSomeProducts((item) => {
					// if we don't have enought to fill the space to four add some products from other categories
					if (i < 4 && item.category.name !== product.category.name) {
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
		} catch (err) {
			console.log(err);
		}
	},

	deleteItem: async function (req, res) {
		try {
			const id = req.params.id;
			productModel.deleteProduct(id);

			res.redirect('list');
		} catch (err) {
			console.log(err);
		}
	},

	getShoppingCart: function (req, res) {
		res.render(pathViews('shopping-cart'));
	},
};

module.exports = controller;
