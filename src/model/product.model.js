const path = require('path');
const fs = require('fs');

// path of products JSON
const productsFilePath = path.resolve(__dirname, '../data/products.json');

const model = {
	// get the major id plus 1
	newId: function () {
		let lastId = 0;
		this.getProducts().forEach((product) => (lastId = parseInt(product.id) > lastId ? product.id : lastId));
		return (parseInt(lastId) + 1).toString();
	},
	// get all products in an array
	getProducts: function () {
		return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	},
	// get some products in an array
	getSomeProducts: function (callBack) {
		return this.getProducts().filter(callBack);
	},
	// get just one product
	getOne: function (id) {
		let product = this.getProducts().find((item) => item.id == id);
		return product;
	},
	// update the JSON of products with a new array of products
	updateList: function (list) {
		const jsonProducts = JSON.stringify(list, null, 4);
		fs.writeFileSync(productsFilePath, jsonProducts);
	},
	// change a product making match trought its id
	editProduct: function (req) {
		const products = this.getProducts();
		const id = req.params.id;
		products.forEach((product) => {
			if (product.id === id) {
				product.name = req.body.name;
				product.price = {
					kilo: parseInt(req.body.kilo),
					unidad: parseInt(req.body.unidad),
				};
				product.discount = req.body.discount;
				product.category = [req.body.category];
				req.file != undefined ? (product.image = req.file.filename) : (product.image = product.image);
				product.market = req.body.market;
			}
		});
		this.updateList(products);
	},

	storeProduct: function (req) {
		const kiloValue = req.body.kilo;
		const unitValue = req.body.unidad;

		// prettier-ignore
		let wayToBuy =
			(kiloValue == 0 && unitValue > 0) || (kiloValue == null && unitValue > 0) ? '1':
			(kiloValue > 0 && unitValue == 0) || (kiloValue > 0 && unitValue == null) ? '0':
			(kiloValue > 0 && unitValue > 0)                                          ? '2':
																						' ';
		const product = {
			id: this.newId(),
			name: req.body.name,
			price: {
				kilo: parseInt(kiloValue),
				unidad: parseInt(unitValue),
			},
			discount: req.body.discount,
			category: [req.body.category],
			image: req.file != undefined ? req.file.filename : 'default.jpg',
			market: req.body.market,
			wayToBuy: wayToBuy,
		};

		const products = this.getProducts();
		products.push(product);
		this.updateList(products);
	},
	deleteProduct: function (id) {
		const newProductsList = this.getSomeProducts((product) => product.id != id);
		this.updateList(newProductsList);
	},
};

module.exports = model;
