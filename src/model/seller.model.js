// let env = process.env

// env.USER = 'root'
// env.DATABASE_PASSWORD = '1234'
// env.DATABASE_NAME = 'LocalMarket'
// env.DATABASE_HOST = '127.0.0.1'
// env.DATABASE_PORT = '3307'

const path = require('path');

// const fs = require('fs');
// const dataSellers = require('../data/sellers.json');

const db = require(path.resolve(__dirname, '../database/models'));

const model = {
	// Obtener todos los sellers
	getSellers: async function () {
		// return JSON.parse(fs.readFileSync(sellerFilePath), 'utf-8');
		try {
			let seller = await db.User.findAll({
				include: ['rol'],
				where: {
					rols_id: 1,
				},
			});
			return seller;
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	// Encontrar un seller por email
	findByEmailSeller: async function (email) {
		try {
			const allSellers = await this.getSellers();
			const foundSeller = await allSellers.find((item) => item.email === email);
			return foundSeller;
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	// Crear seller
	createSeller: async function (user) {
		try {
			let newuser = {
				user_name: user.user_name,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
				rols_id: 1,
			};
			await db.User.create(newuser);
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	// Actualizar seller
	updateSeller: async function (id, user) {
		try {
			console.log(user);
			let updateUser = {
				user_name: user.user_name,
				names: user.names,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				password: user.password,
				photo: user.photo,
			};
			await db.User.update(updateUser, { where: { id: id } });
		} catch (err) {
			console.log(err);
		}
	},
	deleteSeller: async function (id) {
		try {
			await db.User.destroy({ where: { id: id } });
		} catch (err) {
			console.log(err);
		}
	},
	getOne: async function (id) {
		let user = await db.User.findByPk(id, {
			include: ['rol', 'products'],
			where: {
				rols_id: 1,
			},
		});
		return oneUser;
	},
};

module.exports = model;
// let newuser =
// {
// user_name:'Maria2 Mulata',
// names:'Lisa1',
// surname:'Romo1',
// email:'mulata@gmail.com',
// phone:'125643987',
// password:'D1234567890z',
// photo:'user.photo'
// }
// async function Mostrar(){
// 	let x= await model.deleteSeller(2)
// 	console.log(x)
//   }

//   Mostrar()
