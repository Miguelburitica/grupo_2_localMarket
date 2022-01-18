const path = require('path');
const db = require(path.resolve(__dirname, '../database/models'));
const { Op } = require('sequelize');

class Product {
	constructor(id, name, wayToSell, kilo, unidad, discount, category, market, image) {
		this.id = id;
		this.name = name;
		this.wayToSell = wayToSell;
		this.kilo = kilo;
		this.unit = unidad;
		this.discount = discount;
		this.categories_id = category;
		this.markets_id = market;
		this.image = image;
		this.users_id = 1;
	}
}

const model = {
	// get the largest id
	lastId: async function () {
		let lastId = 0;
		let products = await this.getProducts();
		products.forEach((product) => (lastId = parseInt(product.id) > lastId ? product.id : lastId));
		return lastId;
	},
	// get the largest id plus 1
	newId: async function () {
		let lastId = 0;
		let products = await this.getProducts();
		products.forEach((product) => (lastId = parseInt(product.id) > lastId ? product.id : lastId));
		return (parseInt(lastId) + 1).toString();
	},
	// get all products in an array
	getProducts: async function () {
		try {
			// return  JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			let productos = await db.Product.findAll({
				include: ['category', 'market'],
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
			// return this.getProducts().filter(callBack);
			let productos = await db.Product.findAll({
				include: ['category', 'market'],
			});
			let newProducts = productos.filter(callBack);
			return newProducts;
		} catch (err) {
			return err;
		}
	},
	getSearched: async function (query) {
		try {
			let results = await db.Product.findAll({
				where: {
					name: {
						[Op.substring]: [query],
					},
				},
			});
			return results;
		} catch (err) {
			console.log(err);
		}
	},
	// get just one product
	getOne: async function (id) {
		let product = await db.Product.findByPk(id, {
			include: ['category', 'market'],
		});
		return product;
	},
	// change a product making match trought its id
	editProduct: async function (req) {
		try {
			const id = req.params.id;
			const kiloValue = parseInt(req.body.kilo);
			const unitValue = parseInt(req.body.unit);
			console.log(kiloValue);
			console.log(unitValue);
			// prettier-ignore
			let wayToSell = (kiloValue == 0 && unitValue > 0) || (kiloValue == null && unitValue > 0) ? 1 :
							(kiloValue > 0 && unitValue == 0) || (kiloValue > 0 && unitValue == null) ? 0 :
							(kiloValue > 0 && unitValue > 0)                                          ? 2 :
																					   ''

			// simplified the req.body to body
			let body = req.body;
			// prettier-ignore
			let components = [
				id, 
				body.name, 
				wayToSell, 
				kiloValue, 
				unitValue, 
				body.discount,
				body.category,
				body.market

			];
			console.log(components);
			req.file != undefined ? components.push(req.file.filename) : components.push('default.jpg');
			let product = new Product(...components);
			console.log(product);
			db.Product.update(product, {
				where: { id: id },
			});
		} catch (err) {
			console.log(err);
		}
		// const products = this.getProducts();
		// products.forEach((product) => {
		// 	if (product.id === id) {
		// 		product.name = req.body.name;
		// 		product.price = {
		// 			kilo: parseInt(req.body.kilo),
		// 			unidad: parseInt(req.body.unidad),
		// 		};
		// 		product.discount = req.body.discount;
		// 		product.category = [req.body.category];
		// 		req.file != undefined ? (product.image = req.file.filename) : (product.image = product.image);
		// 		product.market = req.body.market;
		// 	}
		// });
		// this.updateList(products);
	},

	storeProduct: async function (req) {
		try {
			const id = req.params.id;
			const kiloValue = parseInt(req.body.kilo);
			const unitValue = parseInt(req.body.unidad);

			// prettier-ignore
			let wayToSell = (kiloValue == 0 && unitValue > 0) || (kiloValue == null && unitValue > 0) ? 1 :
							(kiloValue > 0 && unitValue == 0) || (kiloValue > 0 && unitValue == null) ? 0 :
							(kiloValue > 0 && unitValue > 0)                                          ? 2 :
																					   ''

			// simplified the req.body to body
			let body = req.body;
			// prettier-ignore
			let components = [
				id, 
				body.name, 
				wayToSell, 
				body.kilo, 
				body.unit, 
				body.discount,
				body.category,
				body.market
			];
			req.file != undefined ? components.push(req.file.filename) : components.push('default.jpg');
			let product = new Product(...components);
			delete product.id;
			console.log(product);
			await db.Product.create(product);
		} catch (err) {
			console.log(err);
		}
		// const kiloValue = req.body.kilo;
		// const unitValue = req.body.unidad;

		// // prettier-ignore
		// let wayToBuy =
		// 	(kiloValue == 0 && unitValue > 0) || (kiloValue == null && unitValue > 0) ? 1 :
		// 	(kiloValue > 0 && unitValue == 0) || (kiloValue > 0 && unitValue == null) ? 0 :
		// 	(kiloValue > 0 && unitValue > 0)                                          ? 2 :
		// 																			   ''

		// const product = {
		// 	id: this.newId(),
		// 	name: req.body.name,
		// 	price: {
		// 		kilo: parseInt(kiloValue),
		// 		unidad: parseInt(unitValue),
		// 	},
		// 	discount: req.body.discount,
		// 	category: [req.body.category],
		// 	image: req.file != undefined ? req.file.filename : 'default.jpg',
		// 	market: req.body.market,
		// 	wayToBuy: wayToBuy,
		// };

		// const products = this.getProducts();
		// products.push(product);
		// this.updateList(products);
	},

	deleteProduct: async function (id) {
		try {
			await db.Product.destroy({ where: { id: id } });
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
// };

// model.editProduct(req);
