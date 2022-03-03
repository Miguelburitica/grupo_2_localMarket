const { categoryModel } = require('../../model')

const controller = {
	getAll: async function (req, res) {
		try {
			const categoriesResponse = await categoryModel.getAll()
			const response = {
				head: {
					status: 200,
					query: 'api/categories',
					description: 'An array with all categories in the database',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					length: categoriesResponse.length,
					dataType: 'array',
					data: categoriesResponse
				}
			}
			res.status(200).json(response)
		} catch (err) {
			const response = {
				head: {
					status: 500,
					query: 'api/categories',
					description: "look like we have a problem with the database connection, I'm sorry", 
					specialMessage: "sometimes it's left you with just shit, so, guess what, you still alive or not, that mountain of shit never stop the reality :3"
				},
				body: {
					error: "We have troubles :("
				}
			}
			res.status(500).json(response)
		}
	},
	getOne: async function (req, res) {
		try {		
			const category = await categoryModel.getByPk(req.params.id)
			const response = {
				head: {
					status: 200,
					query: `api/categories/${req.params.id}`,
					description: 'Just one category, the category with the same id that the query',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					dataType: 'object',
					data: category
				}
			}
			res.status(200).json(response)

		} catch (err) {
			const response = {
				head: {
					status: 404,
					query: `api/categorys/${req.params.id}`,
					description: "look like we have a problem with the database connection, I'm sorry", 
					specialMessage: "sometimes it's left you with just shit, so, guess what, you still alive or not, that mountain of shit never stop the reality :3"
				},
				body: {
					error: "We have troubles :("
				}
			}
			res.status(404).json(response)
		}	
	}, 
	updateOne: async function (req, res) {
		try {
			const secret = process.env.secret
			if (req.query.secret !== secret) throw new Error({status: 401})
			const request = {
				params: {
					id: req.query.id
				},
				body: {
					name: req.body.name,
					kilo: req.body.kilo,
					unit: req.body.unit,
					discount: req.body.discount,
					category: req.body.category,
					category: req.body.category,
				},
			}
			categoryModel.editcategory(request)

			const categoryResponse = {
				head: {
					status: 201,
					query: `api/categorys/`,
					description: 'Update one category.',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					action: 'PUT',
					data: req
				}
			}
			res.status(200).json(categoryResponse)
		} catch (err) {
			if (err.status === 401) {
				const response = {
					head: {
						status: 401,
						query: `api/categorys/`,
						description: "Your bad, you haven't our secret, try later please", 
						specialMessage: "sometimes it's left you with just shit, so, guess what, you still alive or not, that mountain of shit never stop the reality :3"
					},
					body: {
						error: "We have troubles :("
					}
				}
				res.status(401).json(response)
			}
			console.log(err);
		}	
	}
}

module.exports = controller
