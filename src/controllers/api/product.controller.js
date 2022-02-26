const res = require('express/lib/response')
const { productModel } = require('../../model')

const controller = {
	getAll: async function () {
		try {
			const allProducts = await productModel.getProducts()
			console.log(allProducts)
			res.json(allProducts)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = controller
