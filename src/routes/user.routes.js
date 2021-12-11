const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const { check } = require('express-validator');
// Se agrego sólo, aún no sé que hace, cuando lo pruebe todo lo reviso
const { is } = require('express/lib/request');

let validateRegister = [
	check('user-name').notEmpty().withMessage('Trata ingresar el nombre por el cual quieres que te reconozcan O.o .'),
	check('name').notEmpty().withMessage('Trata ingresar tu nombre favorito :3 .'),
	check('surname').notEmpty().withMessage('Trata ingresar ambos apellidos para diferenciarte con claridad :D .'),
	check('phone')
		.notEmpty()
		.withMessage(
			'Trata ingresar un número de celular, correo del que estés atento para estar atento a cualquier novedad >.< .'
		)
		.bail()
		.isInt()
		.withMessage('El número de celular sólo debe contener números amig@.'),
	check('pass')
		.notEmpty()
		.withMessage('Trata ingresar una contraseña no tan fácil que puedas recordar Uwu.')
		.bail()
		.isLength({ min: 8, max: 50 })
		.isLowercase()
		.isUppercase()
		.withMessage(
			'La contraseña debe contener mayúsculas, minúsculas con al menos 8 caracteres y máximo 50 caracteres >n< .'
		),
	check('pass-confirm') /*.equals(req.body.pass_confirm)*/
		.custom(() => {
			if (req.body.pass === req.body.pass_confirm) {
				return true;
			} else {
				return false;
			}
		})
		.withMessage('Debe ser igual que la contraseña que ingresaste'),
	check('email')
		.notEmpty()
		.withMessage(
			'Trata ingresar tu correo, correo del que estés atento para estar al tanto de cualquier novedad. >_<'
		)
		.isEmail()
		.withMessage('El correo debe tener un formato de correo valido como "ejemplo@organizacion.tipo"'),
];

// GET Seller page.
router.get('/seller', userController.showSellerProfile);
// GET Customer page.
router.get('/customer', userController.showCustomerProfile);

// Mostrar el login.
router.get('/login', userController.showLogin);
// Enviar los datos del login.
router.post('/login', userController.processLogin);


// Get Sign-in page comprador
router.get('/sign-in-customer', userController.showSignInCustomer);
// Enviar datos de registro de comprador
router.post('/sign-in-customer', userController.addUser);

// Get Sign-in page vendedor
router.get('/sign-in-seller', userController.showSignInSeller);
//  Enviar datos de registro de vendedor
router.post('/sign-in-seller', userController.addUser);

module.exports = router;
