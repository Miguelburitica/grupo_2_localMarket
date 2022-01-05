const path = require('path');

const productModel = require(path.resolve(__dirname, './product.model'));
const sellerModel = require(path.resolve(__dirname, './seller.model'));
const customerModel = require(path.resolve(__dirname, './customer.model'));

module.exports = {
	productModel,
	sellerModel,
	customerModel
};
