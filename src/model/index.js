const path = require('path');

const productModel = require(path.resolve(__dirname, './product.model'));
const userModel = require(path.resolve(__dirname, './user.model'));

module.exports = {
	productModel,
	userModel,
};
