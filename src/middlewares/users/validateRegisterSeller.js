const { check } = require('express-validator');
const path = require('path');

// when the customer.model be ready, this function make the validation of the email already exist
// const { getSellers } = require(path.resolve(__dirname, '../../model/seller.model'));

// async function emailExist(email) {
// 	let sellers = await getsellers();
// 	let sellerEmails = sellers.map((seller) => seller.email);
// 	let isExist = sellerEmails.includes(email);

// 	return isExist;
// }

// UserName validation
// async function usernameExist(userName) {
// 	let sellers = await getsellers();
// 	let userNames = sellers.map((seller) => seller.username);
// 	let isExist = userNames.includes(userName);

// 	return isExist;
// }

const sellers = require(path.resolve(__dirname, '../../data/sellers.json'));
const sellersEmails = sellers.map((item) => item.email);

const validateRegisterSeller = [
	check('user_name').notEmpty().withMessage('Trata ingresar el nombre por el cual quieres que te reconozcan O.o .'),
	check('name')
		.notEmpty()
		.withMessage('Trata ingresar tu nombre favorito :3 .')
		.bail()
		.isLength({ min: 2, max: 45 })
		.withMessage('Tu nombre no puede tener menos de 3 letras :/, y como máximo puedo tener 45 UwU.')
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
		.withMessage('Tu nombre no puede ser un número o contener alguno .-.'),
	check('surname')
		.notEmpty()
		.withMessage('Trata ingresar ambos apellidos para diferenciarte con claridad :D .')
		.bail()
		.isLength({ min: 2, max: 45 })
		.withMessage('Tu apellido no puede tener menos de 3 letras :/, y como máximo puedo tener 45 UwU.')
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
		.withMessage('Tus apellidos no pueden ser un número o contener alguno .-.'),
	check('phone')
		.notEmpty()
		.withMessage(
			'Trata ingresar un número de celular, número del que estés pendiente para atender cualquier novedad >.< .'
		)
		.bail()
		.isMobilePhone(['es-CO'])
		.withMessage('El número de celular debe ser un número de telefonía movil Colombiana.'),
	check('profile_photo')
		.custom((value, { req }) => {
			let format = req.file.mimetype;
			console.log(req.file);
			let formats = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
			return formats.includes(format);
		})
		.withMessage('Sólo es permitido subir archivos jpg, png, jpeg y gif, srry :('),
	check('pass')
		.notEmpty()
		.withMessage('Trata ingresar una contraseña no tan fácil que puedas recordar Uwu.')
		.bail()
		.isStrongPassword({ minSymbols: 0 })
		.withMessage(
			'La contraseña debe contener mayúsculas, minúsculas con al menos 8 caracteres y máximo 50 caracteres >n< .'
		),
	check('pass_confirm')
		.custom((value, { req }) => value === req.body.pass)
		.withMessage('Debe ser igual que la contraseña que ingresaste'),
	check('email')
		.notEmpty()
		.withMessage(
			'Trata ingresar tu correo, correo del que estés atento para estar al tanto de cualquier novedad. >_<'
		)
		.bail()
		.isEmail()
		.withMessage('El correo debe tener un formato de correo válido como "ejemplo@organizacion.tipo"')
		.bail()
		.custom((value) => {
			// return emailExist(value)
			return !sellersEmails.includes(value);
		})
		.withMessage('El correo que tratas de ingresar ya se encuentra registrado °n°'),
];

module.exports = validateRegisterSeller;
