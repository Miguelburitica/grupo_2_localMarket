const { marketModel } = require('../../model')

const controller = {
	getAll: async function (req, res) {
		try {
			const marketsResponse = await marketModel.getAll()
			const response = {
				head: {
					status: 200,
					query: 'api/markets',
					description: 'An array with all markets in the database',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					length: marketsResponse.length,
					dataType: 'array',
					data: marketsResponse
				}
			}
			res.status(200).json(response)
		} catch (err) {
			const response = {
				head: {
					status: 500,
					query: 'api/markets',
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
            console.log(req.params.id)
			const market = await marketModel.getByPk(req.params.id)
			const response = {
				head: {
					status: 200,
					query: `api/markets/:${req.params.id}`,
					description: 'Just one market, the market with the same id that the query',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					dataType: 'object',
					data: market
				}
			}
			res.status(200).json(response)
		} catch (err) {
			const response = {
				head: {
					status: 404,
					query: `api/markets/:${req.params.id}`,
					description: "look like we have a problem with the database connection, I'm sorry", 
					specialMessage: "sometimes it's left you with just shit, so, guess what, you still alive or not, that mountain of shit never stop the reality :3"
				},
				body: {
					error: "We have troubles :("
				}
			}
			res.status(404).json(response)
            console.log(err);
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
					market: req.body.market,
				},
			}
			marketModel.editmarket(request)

			const marketResponse = {
				head: {
					status: 201,
					query: `api/markets/`,
					description: 'Update one market.',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					action: 'PUT',
					data: req
				}
			}
			res.status(200).json(marketResponse)
		} catch (err) {
			if (err.status === 401) {
				const response = {
					head: {
						status: 401,
						query: `api/markets/`,
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
