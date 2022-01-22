let env = process.env

env.USER = 'root'
env.DATABASE_PASSWORD = '1234'
env.DATABASE_NAME = 'LocalMarket'
env.DATABASE_HOST = '127.0.0.1'
env.DATABASE_PORT = '3307'

const path = require('path');

// const fs = require('fs');
// const dataSellers = require('../data/sellers.json');

const db = require( path.resolve(__dirname, '../database/models'));

const model = {
	// Obtener todos los sellers
	getSellers: async function () {
		// return JSON.parse(fs.readFileSync(sellerFilePath), 'utf-8');
		try{
			let seller = await db.User.findAll({
				include:['rol'],
				where:{
					rols_id:1,
				}
			});
			return seller;
		}catch(err){
			console.log(err)
			return err
		}
	},
	// Encontrar un seller por email
	findByEmailSeller: async function (email) {
		try {
		const allSellers = await this.getSellers();
		const foundSeller = await allSellers.find((item) => item.email === email);
		return foundSeller;
	}catch (err){
        console.log(err)
        return err;
	}
},
	// Actualizar el JSON de sellers
	updateSellers: function (sellers) {
		fs.writeFileSync(sellerFilePath, JSON.stringify(sellers, null, 4));
	},
	createSeller: async function(user){
	try {
	let newUser =
		{
        user_name:user.user_name,
        names:user.names,
        surname:user.surname,
        email:user.email,
        phone:user.phone,
        password:user.password,
        photo:user.photo,
        rols_id:1
		}
	await db.User.create(newUser)
	} catch (err){
		console.log(err)
        return err;
	}
	},

	//Obtener el nuevo ID seller
	// newSellerId: function () {
	// 	let ultimo = 0;
	// 	this.getSellers().forEach((seller) => {
	// 		if (seller.id > ultimo) {
	// 			ultimo = seller.id;
	// 		}
	// 	});
	// 	return ultimo + 1;
	// },
};

// module.exports = model;
let newuser =
{
user_name:'dianitas',
names:'Dianas',
surname:'Dominguezs',
email:'dianitsa@gmail.com',
phone:'125623987',
password:'D1234567890z',
photo:'user.photo',
}
async function Mostrar(){
	let x= await model.createSeller(newuser)
	console.log(x)
  }
  
  Mostrar()
