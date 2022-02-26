const { customerModel } = require('../../model')

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
}

module.exports= controller