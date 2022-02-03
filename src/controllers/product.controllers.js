const path = require('path');
const { validationResult } = require('express-validator');
const { productModel, sellerModel, categoryModel, marketModel } = require('../model');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/products/' + nameView + '.ejs');
};

const controller = {
	getList: async function (req, res) {
		let id = req.session.sellerLogged.id;
		const user = await sellerModel.getOne(id);
		let products = user.products;
		res.render(pathViews('list'), {
			products,
		});
	},

	getCatalog: async function (req, res) {
		try {
			// it will be a function in the future
			const frutas = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'frutas') {
					return product;
				}
			});

			const verduras = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'verduras') {
					return product;
				}
			});

			const hortalizas = await productModel.getSomeProducts((product) => {
				if (product.category.name == 'hortalizas') {
					return product;
				}
			});

			res.render(pathViews('catalog'), {
				frutas,
				verduras,
				hortalizas,
			});
		} catch (err) {
			console.log(err);
		}
	},

	getEdit: async function (req, res) {
		try {
			const id = req.params.id;
			const product = await productModel.getOne(id);
			const categories = await categoryModel.getAll();
			const markets = await marketModel.getAll();
			res.render(pathViews('edit-item'), { product, categories, markets });
		} catch (err) {
			console.log(err);
		}
	},

	updateItem: async function (req, res) {
		try {
			const errors = await validationResult(req);
			const categories = await categoryModel.getAll();
			const markets = await marketModel.getAll();

			// validación de Edición.
			if (errors.isEmpty()) {
				// Aquí implementaré el cómo se agrega un producto teniendo en cuenta el usuario asociado
				if (req.session.sellerLogged !== undefined) {
					// modelo que creará el nuevo producto en el JSON de productos
					await productModel.editProduct(req);

					// redirijo a la lista de productos
					res.redirect('/products/detail/' + req.params.id);
				} else {
					// si llega a acabarse la sesión antes de crear el producto le enviará este mensaje de apoyo :3
					res.send('Chic@ no deberías estar viendo esto >:°, vuelve a iniciar sesión plz');
				}
				// en caso de que hayan errores, redirije al formulario de crear item, para crearlo bien
			} else {
				console.log(errors.mapped());
				res.render(pathViews('add-item'), {
					errors: errors.mapped(),
					oldData: req.body,
					categories,
					markets,
				});
			}
		} catch (err) {
			console.log(err);
		}
	},

	getAdd: async function (req, res) {
		const categories = await categoryModel.getAll();
		const markets = await marketModel.getAll();
		res.render(pathViews('add-item'), { categories: categories, markets: markets });
	},

	createItem: async function (req, res) {
		try {
			const errors = await validationResult(req); // validación de creación.
			const categories = await categoryModel.getAll();
			const markets = await marketModel.getAll();
			if (errors.isEmpty()) {
				// Aquí implementaré el cómo se agrega un producto teniendo en cuenta el usuario asociado
				if (req.session.sellerLogged !== undefined) {
					// modelo que creará el nuevo producto en el JSON de productos
					await productModel.storeProduct(req);

					// redirijo a la lista de productos
					res.redirect('list');
				} else {
					// si llega a acabarse la sesión antes de crear el producto le enviará este mensaje de apoyo :3
					res.send('Chic@ no deberías estar viendo esto >:°, vuelve a iniciar sesión plz');
				}
				// en caso de que hayan errores, redirije al formulario de crear item, para crearlo bien
			} else {
				console.log(errors.mapped());
				res.render(pathViews('add-item'), {
					errors: errors.mapped(),
					oldData: req.body,
					categories,
					markets,
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
						i++;
						return item;
					}
				});
				// I join both arrays
				extraSuggest.forEach((item) => {
					suggestProducts.push(item);
				});

				res.render(pathViews('detailCustomer'), {
					product: product,
					suggest: suggestProducts,
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

				res.render(pathViews('detailCustomer'), {
					product: product,
					suggest: suggestProducts,
				});
			}
		} catch (err) {
			console.log(err);
		}
	},

	deleteItem: async function (req, res) {
		try {
			productModel.deleteProduct(req.params.id);

			res.redirect('list');
		} catch (err) {
			console.log(err);
		}
	},

	getShoppingCart: function (req, res) {
		res.render(pathViews('shoppingCart'));
	},

	search: async function (req, res) {
		try {
			let query = req.query.q;
			let results = await productModel.getSearched(query);
			res.render(pathViews('searchResult'), { results, query });
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = controller;
