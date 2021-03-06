const { check } = require('express-validator');
const path = require('path');

// when the customer.model be ready, this function make the validation of the email already exist
// const { getCustomers } = require(path.resolve(__dirname, '../../model/customer.model'));

// async function emailExist(email) {
// 	let customers = await getCustomers();
// 	let customerEmails = customers.map((customer) => customer.email);
// 	let isExist = customerEmails.includes(email);

// 	return isExist;
// }

const customers = require(path.resolve(__dirname, '../../data/customers.json'));
const customersEmails = customers.map((item) => item.email);

let validateRegisterCustomer = [
	check('names')
		.notEmpty()
		.withMessage('Este campo no puede estar vacio.')
		.bail()
		.isLength({ min: 2, max: 45 })
		.withMessage('Tu nombre no puede tener menos de 3 letras, y como máximo puedo tener 45.')
		.bail()
		.custom((value) => {
			let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			let res = true;

			numbers.forEach((number) => {
				if (value.includes(number)) {
					res = false;
					return res;
				}
			});
			return res;
		})
		.withMessage('Tu nombre no puede ser un número o contener alguno'),
	check('surname')
		.notEmpty()
		.withMessage('Este campo no puede estar vacio.')
		.bail()
		.isLength({ min: 2, max: 45 })
		.withMessage('Tu apellido no puede tener menos de 3 letras, y como máximo puedo tener 45.')
		.bail()
		.custom((value) => {
			let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			let res = true;

			numbers.forEach((number) => {
				if (value.includes(number)) {
					res = false;
					return res;
				}
			});
			return res;
		})
		.withMessage('Tus apellidos no pueden ser un número o contener alguno'),
	check('phone')
		.notEmpty()
		.withMessage(
			'Este campo no puede estar vacio.'
		)
		.bail(),
		// .isMobilePhone(['es-CO'])
		// .withMessage('El número de celular debe ser un número de telefonía movil Colombiana.'),
	check('photo')
		.custom((value, { req }) => {
			let format = req.file.mimetype;
			let formats = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
			return formats.includes(format);
		})
		.withMessage('Sólo es permitido subir archivos jpg, png, jpeg y gif.'),
	check('password')
		.notEmpty()
		.withMessage('Este campo no puede estar vacio.')
		.bail()
		.isStrongPassword({ minSymbols: 0 })
		.withMessage(
			'La contraseña como minimo debe tener 8 caracteres entre ellos al menos un número, una mayúscula y una minúscula.'
		),
	check('password_confirm')
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Debe ser igual que la contraseña que ingresaste'),
	check('email')
		.notEmpty()
		.withMessage(
			'Este campo no puede estar vacio'
		)
		.bail()
		.isEmail()
		.withMessage('El correo debe tener un formato de correo valido como "ejemplo@organizacion.tipo"')
		.bail()
		.custom((value) => {
			// return emailExist(value)
			return !customersEmails.includes(value);
		})
		.withMessage('El correo que tratas de ingresar ya se encuentra registrado'),
];

module.exports = validateRegisterCustomer;
