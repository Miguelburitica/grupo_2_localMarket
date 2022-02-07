const path = require('path')

const productModel = require(path.resolve(__dirname, './product.model'))
const sellerModel = require(path.resolve(__dirname, './seller.model'))
const customerModel = require(path.resolve(__dirname, './customer.model'))
const marketModel = require(path.resolve(__dirname, './market.model'))
const categoryModel = require(path.resolve(__dirname, './category.model'))

module.exports = {
	productModel,
	sellerModel,
	customerModel,
	marketModel,
	categoryModel,
}
