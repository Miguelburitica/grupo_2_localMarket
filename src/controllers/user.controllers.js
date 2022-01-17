const path = require('path');
const dataSellers = require('../data/sellers.json');
const dataCustomers = require('../data/customers.json');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sellerModel } = require('../model');
const { customerModel } = require('../model');

const pathViews = function (nameView) {
	return path.resolve(__dirname, '../views/users/' + nameView + '.ejs');
};

const controller = {
	// Mostrar perfil de vendedor
	getSellerProfile: function (req, res) {
		res.render(pathViews('seller'), { seller: req.session.sellerLogged });
	},
	// Mostrar registro de vendedor
	getSignInSeller: function (req, res) {
		res.render(pathViews('sign-in-seller'));
	},
	// Eliminar vendedor
	deleteSeller: function (req, res) {
		const idToDelete = req.params.id;
		const sellers = sellerModel.getSellers();
		const newSellerList = sellers.filter((seller) => seller.id != idToDelete);
		sellerModel.updateSellers(newSellerList);
		// console.log(newSellerList);
		res.redirect('/');
	},
	// Mostrar perfil de comprador
	getCustomerProfile: function (req, res) {
		res.render(pathViews('customer'), { customer: res.locals.customerLogged });
	},
	// Registro de comprador
	getSignInCustomer: function (req, res) {
		res.render(pathViews('sign-in-customer'));
	},
	// Eliminar comprador
	deleteCustomer: function (req, res) {
		const idToDelete = req.params.id;
		const customers = customerModel.getCustomers();
		const newCustomerList = customers.filter((customer) => customer.id != idToDelete);
		customerModel.updateCustomers(newCustomerList);
		res.redirect('/');
	},
	// 	Crea usuario vendedor o comprador
	addUser: function (req, res) {
		// trae los errores del form
		let errors = validationResult(req);
		console.log(errors.mapped());
		// Comprueba que los datos que vienen del form, vienen ok y si sí, hace esto
		if (errors.isEmpty()) {
			// Es encapsulado en una variable el objeto usuario
			const user = {
				...req.body,
				agree_data: req.body.agree_data === undefined ? 'off' : req.body.agree_data,
				agree_terms_conditions:
					req.body.agree_terms_conditions === undefined ? 'off' : req.body.agree_terms_conditions,
				pass: bcryptjs.hashSync(req.body.pass, 10),
				pass_confirm: null,
				photo: req.file !== undefined ? req.file.filename : 'default.jpg',
			};
			let users = [];
			// separo el sign-in dependiendo del formulario que sea
			// customer, debido a que un customer no tiene user-name
			if (user.user_name === undefined) {
				user.id = customerModel.newCustomerId();
				users = customerModel.getCustomers();
				users.push(user);
				customerModel.updateCustomers(users);
				// Seller, debido a que sólo hay dos tipos posibles
			} else {
				user.products = [];
				user.id = sellerModel.newSellerId();
				users = sellerModel.getSellers();
				users.push(user);
				sellerModel.updateSellers(users);
			}
			res.redirect('/users/login');
			// En caso de que hayan errores, devuelve la vista con los errores
		} else {
			console.log(`error: ${errors.mapped()}`);
			if (req.body.user_name === undefined) {
				res.render(pathViews('sign-in-customer'), { errors: errors.mapped(), old: req.body });
			} else {
				res.render(pathViews('sign-in-seller'), { errors: errors.mapped(), old: req.body });
			}
		}
	},
	// Login vendedor o comprador
	getLogin: function (req, res) {
		res.render(pathViews('login'));
	},
	// Enviar los datos
	processLogin: function (req, res) {
		// validaciones
		let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render(pathViews('login'), {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			const userToLogCustomer = customerModel.findByEmailCustomer(req.body.email);
			const userToLogSeller = sellerModel.findByEmailSeller(req.body.email); //buscamos los usuarios en cada DB
			req.session.isUserLogged = false;
			if (userToLogCustomer) {
				const passwordOk = bcryptjs.compareSync(req.body.pass, userToLogCustomer.pass); // Hasheo de la contraseña
				if (passwordOk) {
					delete userToLogCustomer.pass;
					req.session.customerLogged = userToLogCustomer;
					req.session.isUserLogged = true;
					// cookies para comprador
					if (req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 3 });
					}
					return res.redirect('/users/customer');
				}
			} else if (userToLogSeller) {
				const passwordOk = bcryptjs.compareSync(req.body.pass, userToLogSeller.pass);
				if (passwordOk) {
					delete userToLogSeller.pass;
					req.session.sellerLogged = userToLogSeller;
					req.session.isUserLogged = true;
					// cookies para vendedor
					if (req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 3 });
					}
					return res.redirect('/users/seller');
				}
			} else {
				res.render(pathViews('login'), {
					errors: {
						email: {
							msg: 'Las credenciales son inválidas',
						},
					},
				});
			}
		}
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
};

module.exports = controller;
