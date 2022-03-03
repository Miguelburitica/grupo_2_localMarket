
const path = require('path');


const db = require(path.resolve(__dirname, '../database/models'));

const model = {

	getAll: async function () {
		try {
			let users = await db.User.findAll();
			return users;
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	getOneUser: async function (id) {
		try{
			let oneUser = await db.User.findByPk(id);
			return oneUser;
		}catch (err) {
			console.log(err);
			return err;
		}

	},
	getCustomers: async function () {
		try {
			let customers = await db.User.findAll({
				include: ['rol'],
				where: {
					rols_id:2,
				},
			});
			return customers;
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	findByEmailCustomer: async function (email) {
		try {
			const allCustomers = await this.getCustomers();
			const foundCustomer = await allCustomers.find((item) => item.email === email);
			return foundCustomer;
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	//falta

	createCustomer: async function (user) {
		try {
			let newuser = {
				user_name: user.email,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
				rols_id:2,
			};
			await db.User.create(newuser);
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	updateCustomer: async function (id, user) {
		try {
			let updateuser = {
				user_name: user.email,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
			};
			await db.User.update(updateuser, { where: { id: id } });
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	deleteCustomer: async function (id) {
		try {
			await db.User.destroy({ where: { id: id } });
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	lastUser: async function () {
        try {
            let users = await db.User.findAll();
            let max = 0;
            let lastuser = users.filter(user => {
                if (user.id > max) {
                    max = user.id;
                }
                return
            });
            let lastId= await db.User.findByPk(max);
            return lastId;
        } catch (err) {
            console.log(err);
        }
    },


	getOne: async function (id) {
		try{
			let oneUser = await db.User.findByPk(id, {
				include: ['rol'],
				where: {
					rols_id:2,
				},
			});
			return oneUser;
		}catch (err) {
			console.log(err);
			return err;
		}

	},
};

module.exports = model;

// let a={
//     names:'Chabe',
//     surname:'Romito',
//     email:'chabe@gmail.com',
//     phone:'0056279494',
//     password:'1245676',
//     photo:'user.photo',
// }
// async function Mostrar(){
//   let x = await model.getAll()
//   console.log(x)
//   }

//  Mostrar()
