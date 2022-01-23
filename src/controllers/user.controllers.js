const path = require('path');
// const dataSellers = require('../data/sellers.json');
// const dataCustomers = require('../data/customers.json');
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
	deleteSeller: async function (req, res) {
		try {
			const idToDelete = req.params.id;
			await sellerModel.deleteSeller(idToDelete)
			// const sellers = sellerModel.getSellers();
			// const newSellerList = sellers.filter((seller) => seller.id != idToDelete);
			// sellerModel.updateSellers(newSellerList);
			// // console.log(newSellerList);
			res.redirect('/');
			}catch(err){
            console.log(err);
        	}
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
	deleteCustomer: async function (req, res) {
		try{
		const idToDelete = req.params.id;
		await customerModel.deleteCustomer(idToDelete);
		res.redirect('/');
		}catch(err){
            console.log(err)
            return err;
        }	
	},
	// 	Crea usuario vendedor o comprador
	addUser: async function (req, res) {
		try {
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
				password: bcryptjs.hashSync(req.body.password, 10),
				password_confirm: null,
				photo: req.file != undefined ? req.file.filename: 'default.jpg'
			};
			console.log(user)
			// let users = [];
			// separo el sign-in dependiendo del formulario que sea
			// customer, debido a que un customer no tiene user-name
			if (user.user_name === undefined) {
				await customerModel.createCustomer(user);
				// Seller, debido a que sólo hay dos tipos posibles
			} else {
				user.products = [];
				await sellerModel.createSeller(user);
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
		}catch(err){
            console.log(err);
        }
	},
	// Login vendedor o comprador
	getLogin: function (req, res) {
		res.render(pathViews('login'));
	},
	// Enviar los datos
	processLogin: async function (req, res) {
		try{
			let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render(pathViews('login'), {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		} else {
			const userToLogCustomer = await customerModel.findByEmailCustomer(req.body.email);
			const userToLogSeller = await sellerModel.findByEmailSeller(req.body.email); //buscamos los usuarios en cada DB
			req.session.isUserLogged = false;
			if (userToLogCustomer) {
				const passwordOk = bcryptjs.compareSync(req.body.password, userToLogCustomer.password); // Hasheo de la contraseña
				if (passwordOk) {
					delete userToLogCustomer.password;
					req.session.customerLogged = userToLogCustomer;
					req.session.isUserLogged = true;
					// cookies para comprador
					if (req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 3 });
					}
					return res.redirect('/users/customer');
				}
			} else if (userToLogSeller) {
				const passwordOk = bcryptjs.compareSync(req.body.password, userToLogSeller.password);
				if (passwordOk) {
					delete userToLogSeller.password;
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
		}catch(err){
            console.log(err);
        }
		// validaciones
		
	},

	editUser: async (req,res)=>{
		try{
		let customer = await customerModel.findOne(parseInt(req.params.id))
		let seller= await sellerModel.findOne(parseInt(req.params.id))

		if(customer){
			res.render(pathViews('edit-customer'),{customer:user});
		}else if(seller){
			res.render(pathViews('edit-seller'),{seller:user});
		}else{
			res.send('Chic@ no deberías estar viendo esto >:°');
		}
		}catch(err){
			console.log(err);
		}
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
};

module.exports = controller;
