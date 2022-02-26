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
					Vendedor: {
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
					Categoria: {
						identificador: product.category.id,
						nombre: product.category.name
					},
					Mercado: {
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
						Vendedor: {
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
						Categoria: {
							identificador: product.category.id,
							nombre: product.category.name
						},
						Mercado: {
							identificador: product.market.id,
							nombre: product.market.name,
							direccion: product.market.direction,
						}
					}
				}
			}

			res.json(productResponse)
		} catch (err) {
			console.log(err)
		}	
	}
}

module.exports = controller
