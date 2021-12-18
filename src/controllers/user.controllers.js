const path = require('path');
const dataSellers = require('../data/sellers.json');
const dataCustomers = require('../data/customers.json');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/users/' + nameView + '.ejs');
};
// ------- Desde aquí -------
function getSellers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sellers.json'), 'utf-8'));
}

function getCustomers() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/customers.json'), 'utf-8'));
}

function findByEmailSeller(email) {
	const allSellers = getSellers();
	const foundSeller = allSellers.find((item) => item.email === email);
	return foundSeller;
}
function findByEmailCustomer(email) {
	const allCustomers = getCustomers();
	const foundCustomer = allCustomers.find((item) => item.email === email);
	return foundCustomer;
}

function updateCustomers(customers) {
	fs.writeFileSync(path.resolve(__dirname, '../data/customers.json'), JSON.stringify(customers, null, 4));
}

function updateSellers(sellers) {
	fs.writeFileSync(path.resolve(__dirname, '../data/sellers.json'), JSON.stringify(sellers, null, 4));
}
//  ------- Hasta aquí------ ¿Qué hace? Están repetidas en el controller que exportas. Avisa si se pueden borrar :)

function newSellerId() {
	let ultimo = 0;
	getSellers().forEach((seller) => {
		if (seller.id > ultimo) {
			ultimo = seller.id;
		}
	});
	return ultimo + 1;
}

function newCustomerId() {
	let ultimo = 0;
	getCustomers().forEach((seller) => {
		if (seller.id > ultimo) {
			ultimo = seller.id;
		}
	});
	return ultimo + 1;
}

const controller = {
	// CONTROLADOR DE VENDEDOR

	// Obtener la DB de vendedor
	getSellers: function () {
		return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sellers.json'), 'utf-8'));
	},
	// Actualizar perfil de vendedor
	updateSellers: function (sellers) {
		fs.writeFileSync(path.resolve(__dirname, '../data/sellers.json'), JSON.stringify(sellers, null, 4));
	},
	// Mostrar perfil de vendedor
	showSellerProfile: function (req, res) {
		res.render(pathViews('seller'), { seller: req.session.sellerLogged });
	},
	// Mostrar registro de vendedor
	showSignInSeller: function (req, res) {
		res.render(pathViews('sign-in-seller'));
	},
	// Eliminar vendedor
	deleteSeller: function (req, res) {
		const idToDelete = req.params.id;
		const sellers = getSellers();
		const newSellerList = sellers.filter((seller) => seller.id != idToDelete);
		updateSellers(newSellerList);
		console.log(newSellerList);
		res.redirect('/');
	},
	// CONTROLADOR DE COMPRADOR
	// Obtener la DB de comprador
	getCustomers: function () {
		return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/customers.json'), 'utf-8'));
	},
	// Actualizar comprador
	updateCustomers: function (customers) {
		fs.writeFileSync(path.resolve(__dirname, '../data/customers.json'), JSON.stringify(customers, null, 4));
	},
	// Mostrar perfil de comprador
	showCustomerProfile: function (req, res) {
		res.render(pathViews('customer'), { customer: req.session.customerLogged });
	},
	// Registro de comprador
	showSignInCustomer: function (req, res) {
		res.render(pathViews('sign-in-customer'));
	},
	// Eliminar comprador
	deleteCustomer: function (req, res) {
		const idToDelete = req.params.id;
		const customers = getCustomers();
		const newCustomerList = customers.filter((customer) => customer.id != idToDelete);
		updateSellers(newCustomerList);
		res.redirect('/');
	},
	// 	Crea usuario vendedor o comprador
	addUser: function (req, res) {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			console.log(req.file);
			const user = {
				...req.body,
				pass: bcryptjs.hashSync(req.body.pass, 10),
				pass_confirm: null,
				image: req.file !== undefined ? req.file.filename : 'default.jpg',
			};
			let users = [];
			console.log(user);
			if (user.user_name === undefined) {
				user.id = newCustomerId();
				users = getCustomers();
				users.push(user);
				updateCustomers(users);
			} else {
				user.id = newSellerId();
				users = getSellers();
				users.push(user);
				updateSellers(users);
			}
			res.redirect('/');
		} else {
			console.log(errors.mapped());
			if (req.body.market === undefined) {
				res.render(pathViews('sign-in-customer'), { errors: errors.mapped(), old: req.body });
			} else {
				res.render(pathViews('sign-in-seller'), { errors: errors.mapped(), old: req.body });
			}
		}
	},
	// Login vendedor o comprador
	showLogin: function (req, res) {
		res.render(pathViews('login'));
	},
	// Enviar los datos
	processLogin: function (req, res) {
		const userToLogCustomer = findByEmailCustomer(req.body.email);
		const userToLogSeller = findByEmailSeller(req.body.email);
		req.session.isUserLogged = false;

		if (userToLogCustomer) {
			const passwordOk = bcryptjs.compareSync(req.body.pass, userToLogCustomer.pass);
			if (passwordOk) {
				delete userToLogCustomer.pass;
				req.session.customerLogged = userToLogCustomer;
				req.session.isUserLogged = true;

				if(req.body.remember_user){
					res.cookie('userEmail',req.body.email,{maxAge: (1000*60)*3})
				}
				return res.redirect('/users/customer');
			}
		} 
		else if (userToLogSeller) {
			const passwordOk = bcryptjs.compareSync(req.body.pass, userToLogSeller.pass);
			if (passwordOk) {
				delete userToLogSeller.pass;
				req.session.sellerLogged = userToLogSeller;
				req.session.isUserLogged = true;
				return res.redirect('/users/seller');
			}
		} else {
			// Aquí debería ir la validación del usuario que no existe con errors
			return res.send('Las credenciales son inválidas');
			// return res.send('login', {
			// 	errors:{
			// 		email: {
			// 			msg: 'Las credenciales son inválidas'
			// 		}
			// 	}
			// })
		}
	},

	logout: (req,res)=>{
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = controller;
