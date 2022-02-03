const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));
const { Op } = require('sequelize');

class Product {
	constructor(id, name, wayToSell, kilo, unidad, discount, category, market, image, user_id) {
		this.id = id;
		this.name = name;
		this.wayToSell = wayToSell;
		this.kilo = kilo;
		this.unit = unidad;
		this.discount = discount;
		this.categories_id = category;
		this.markets_id = market;
		this.image = image;
		this.users_id = user_id;
	}
}

function getWayToSell(req) {
	const kiloValue = parseInt(req.body.kilo);
	const unitValue = parseInt(req.body.unit);

	// prettier-ignore
	return (kiloValue == 0 && unitValue >  0) || (kiloValue == null && unitValue > 0) ? 1 :
		   (kiloValue >  0 && unitValue == 0) || (kiloValue > 0 && unitValue == null) ? 0 :
		   (kiloValue >  0 && unitValue >  0)                                         ? 2 : '';
}

const model = {
	// get all products in an array
	getProducts: async function () {
		try {
			let productos = await db.Product.findAll({
				include: ['category', 'market', 'seller'],
			});
			return productos;
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	// get some products in an array
	getSomeProducts: async function (callBack) {
		try {
			let productos = await db.Product.findAll({
				include: ['category', 'market', 'seller'],
			});
			let newProducts = productos.filter(callBack);
			return newProducts;
		} catch (err) {
			return err;
		}
	},
	// get just the products that have the query content in the name
	getSearched: async function (query) {
		try {
			let results = await db.Product.findAll({
				where: {
					name: {
						[Op.substring]: [query],
					},
				},
				include: ['category', 'market', 'seller'],
			});
			return results;
		} catch (err) {
			console.log(err);
		}
	},
	// get just one product
	getOne: async function (id) {
		let product = await db.Product.findByPk(id, {
			include: ['category', 'market', 'seller'],
		});
		return product;
	},
	// change a product making match trought its id
	editProduct: async function (req) {
		try {
			const id = req.params.id;

			// get the value of the wayToSell
			let wayToSell = getWayToSell(req);

			// simplified the req.body to body
			let body = req.body;

			// make an array with the components of the product object on the specified order that need the class
			let components = [
				id,
				body.name,
				wayToSell,
				body.kilo,
				body.unit,
				body.discount,
				body.category,
				body.market,
			];

			const oldProduct = await this.getOne(id);

			// Choose the correct name for the image associated with the product, if it doesn't exist left a default image, if it exists add the image
			req.file !== undefined ? components.push(req.file.filename) : components.push(oldProduct.photo);

			components.push(req.session.sellerLogged.id);

			// using the Product class and the components array, we make the new product that take the place of the last product with the same id
			let product = new Product(...components);
			console.log(product);
			db.Product.update(product, {
				where: { id: id },
			});
		} catch (err) {
			console.log(err);
		}
	},

	storeProduct: async function (req) {
		try {
			let id = null;
			// get the value of the wayToSell
			let wayToSell = getWayToSell(req);

			// simplified the req.body to body
			let body = req.body;

			// make an array with the components of the product object on the specified order that need the class
			let components = [
				id,
				body.name,
				wayToSell,
				body.kilo,
				body.unit,
				body.discount,
				body.category,
				body.market,
			];

			// Choose the correct name for the image associated with the product, if it doesn't exist set a default image, if it exists add the image
			req.file != undefined ? components.push(req.file.filename) : components.push('default.jpg');

			components.push(req.session.sellerLogged.id);

			// using the Product class and the components array, we make the new product that will be added
			let product = new Product(...components);

			// Add the new product
			await db.Product.create(product);
		} catch (err) {
			console.log(err);
		}
	},

	deleteProduct: async function (id) {
		try {
			if (id !== undefined && id !== null) {
				return await db.Product.destroy({ where: { id } });
			} else {
				throw new Error('Falta el id en el delete prro >:s');
			}
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = model;

// let req = {
// 	params: {
// 		id: 2,
// 	},
// 	body: {
// 		name: 'Cebolla Roja',
// 		kilo: 2000,
// 		unit: 400,
// 		discount: 15,
// 		category: 3,
// 		market: 3,
// 	},
// 	file: {
// 		filename: 'redonion.jfif',
// 	},
// 	session: {
// 		sellerLogged: {
// 			id: 1,
// 		},
// 	},
// };

// model.storeProduct(req);
