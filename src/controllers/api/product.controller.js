const { productModel } = require('../../model')

const modoDeVenta = (product) => {
	return product.wayToSell === 0 ? 'SOLO KILO'   :
		   product.wayToSell === 1 ? 'SOLO UNIDAD' : 'POR KILO Y UNIDAD'
}

const controller = {
	getAll: async function (req, res) {
		try {
			const allProducts = await productModel.getProducts()
			const productsResponse = allProducts.map(product => {
				return {
					identificador: product.id,
					nombre: product.name,
					modoDeVenta: modoDeVenta(product),
					precioPorKilo: product.kilo,
					precioPorUnidad: product.unit,
					porcentajeDescuento: product.discount,
					nombreDeImagen: product.image,
					vendedor: {
						identificador: product.seller.id,
						nombreDeUsuario: product.seller.user_name,
						nombres: product.seller.names,
						apellidos: product.seller.surnames,
						email: product.seller.email,
						celular: product.seller.phone,
						contraseñaHasheada: product.seller.password,
						foto: product.seller.photo,
						rol: product.seller.rols_id === 1 ? 'seller' : 'customer'
					},
					categoria: {
						identificador: product.category.id,
						nombre: product.category.name
					},
					mercado: {
						identificador: product.market.id,
						nombre: product.market.name,
						direccion: product.market.direction,
					}
				}
			})
			const response = {
				head: {
					status: 200,
					query: 'api/products',
					description: 'An array with all products in the database',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					length: allProducts.length,
					dataType: 'array',
					data: productsResponse
				}
			}
			res.status(200).json(response)
		} catch (err) {
			const response = {
				head: {
					status: 500,
					query: 'api/products',
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
			const product = await productModel.getOne(req.params.id)
			const productResponse = {
				head: {
					status: 200,
					query: `api/products/:${req.params.id}`,
					description: 'Just one product, the product with the same id that the query',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					dataType: 'object',
					data: {
						identificador: product.id,
						nombre: product.name,
						modoDeVenta: modoDeVenta(product),
						precioPorKilo: product.kilo,
						precioPorUnidad: product.unit,
						porcentajeDescuento: product.discount,
						nombreDeImagen: product.image,
						vendedor: {
							identificador: product.seller.id,
							nombreDeUsuario: product.seller.user_name,
							nombres: product.seller.names,
							apellidos: product.seller.surnames,
							email: product.seller.email,
							celular: product.seller.phone,
							contraseñaHasheada: product.seller.password,
							foto: product.seller.photo,
							rol: product.seller.rols_id === 1 ? 'seller' : 'customer'
						},
						categoria: {
							identificador: product.category.id,
							nombre: product.category.name
						},
						mercado: {
							identificador: product.market.id,
							nombre: product.market.name,
							direccion: product.market.direction,
						}
					}
				}
			}
			res.status(200).json(productResponse)
		} catch (err) {
			const response = {
				head: {
					status: 404,
					query: `api/products/:${req.params.id}`,
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
					market: req.body.market,
				},
			}
			productModel.editProduct(request)

			const productResponse = {
				head: {
					status: 201,
					query: `api/products/`,
					description: 'Update one product.',
					specialMessage: "It's a hard life, no matter what you did, it's keep hard, that's the magic :3"
				},
				body: {
					action: 'PUT',
					data: req
				}
			}
			res.status(200).json(productResponse)
		} catch (err) {
			if (err.status === 401) {
				const response = {
					head: {
						status: 401,
						query: `api/products/`,
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
