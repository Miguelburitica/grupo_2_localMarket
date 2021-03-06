const { customerModel, sellerModel } = require('../../model')

const controller = {

	getUsers: async (req,res)=> {
		try {
			let users = await customerModel.getAll()
			let totalUsers = users.length
			let usersAll = users.map((user) => {
				return user = {
					id:user.id,
					user_name: user.email,
					names: user.names,
					surname: user.surname,
					email: user.email,
					phone: user.phone,
					password: user.password,
					photo: user.photo,
					rols_id:user.rol,
				}
			})
			usersAll = [{count: totalUsers}, [...usersAll]]
			res.json(usersAll)
		} catch (err) {
			res.json({error:'error 504'})
		}
	},

	getCustomer: async (req,res)=> {
		try {
			let users = await customerModel.getCustomers()
			let totalUsers = users.length
			let customersAll = users.map((user) => {
				return user = {
					id:user.id,
					user_name: user.email,
					names: user.names,
					surname: user.surname,
					email: user.email,
					phone: user.phone,
					password: user.password,
					photo: user.photo,
					rols_id:user.rol,
				}
			})
			customersAll = [{count: totalUsers}, [...customersAll]]
			res.json(customersAll)
		} catch (err) {
			res.json({error:'error 504'})
		}
	},

	getSeller: async (req,res)=> {
		try {
			let users = await sellerModel.getSellers()
			let totalUsers = users.length
			let sellersAll = users.map((user) => {
				return user = {
					id:user.id,
					user_name: user.email,
					names: user.names,
					surname: user.surname,
					email: user.email,
					phone: user.phone,
					password: user.password,
					photo: user.photo,
					rols_id:user.rol,
				}
			})
			sellersAll = [{count: totalUsers}, [...sellersAll]]
			res.json(sellersAll)
		} catch (err) {
			res.json({error:'error 504'})
		}
	},

	getOne: async (req,res)=>{
		try{
			let user = await customerModel.getOneUser(req.params.id)
			let newUser = {
				user_name: user.email,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
				rols_id:user.rol,
			}
			res.json(newUser)
		}catch (err) {
			res.json({error:'error 404'})
			return err
		}

	},

	getLastUser: async (req, res) => {
        try {
            let user = await customerModel.lastUser();
            newUser = {
                user_name: user.email,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
				rols_id:user.rol,
            }
            res.json(newUser)
        } catch (err) {
            res.json({error: 'Error 405'})
        }
    }
}

module.exports= controller