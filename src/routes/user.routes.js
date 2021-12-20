const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/images/users'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const uploadFile = multer({ storage });

let validateRegisterSeller = [
	check('user_name').notEmpty().withMessage('Trata ingresar el nombre por el cual quieres que te reconozcan O.o .'),
	check('name').notEmpty().withMessage('Trata ingresar tu nombre favorito :3 .'),
	check('surname').notEmpty().withMessage('Trata ingresar ambos apellidos para diferenciarte con claridad :D .'),
	check('phone')
		.notEmpty()
		.withMessage(
			'Trata ingresar un número de celular, número del que estés pendiente para atender cualquier novedad >.< .'
		)
		.bail()
		.isInt()
		.withMessage('El número de celular sólo debe contener números amig@.'),
	check('pass')
		.notEmpty()
		.withMessage('Trata ingresar una contraseña no tan fácil que puedas recordar Uwu.')
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
		.isEmail()
		.withMessage('El correo debe tener un formato de correo valido como "ejemplo@organizacion.tipo"'),
];

let validateRegisterCustomer = [
	check('name').notEmpty().withMessage('Trata ingresar tu nombre favorito :3 .'),
	check('surname').notEmpty().withMessage('Trata ingresar ambos apellidos para diferenciarte con claridad :D .'),
	check('phone')
		.notEmpty()
		.withMessage(
			'Trata ingresar un número de celular, número del que estés pendiente para atender cualquier novedad >.< .'
		)
		.bail()
		.isInt()
		.withMessage('El número de celular sólo debe contener números amig@.'),
	check('pass')
		.notEmpty()
		.withMessage('Trata ingresar una contraseña no tan fácil que puedas recordar Uwu.')
		.isStrongPassword({ minSymbols: 0 })
		.withMessage(
			'La contraseña como minimo debe tener 8 caracteres entre ellos al menos un número, una mayúscula y una minúscula >n< .'
		),
	check('pass_confirm')
		.custom((value, { req }) => value === req.body.pass)
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

router.post('/sign-in-customer', uploadFile.single('profile_photo'), validateRegisterCustomer, userController.addUser);

// Get Sign-in page vendedor
router.get('/sign-in-seller', userController.showSignInSeller);

// Enviar datos de registro de comprador
router.post('/sign-in-seller', uploadFile.single('profile_photo'), validateRegisterSeller, userController.addUser);

module.exports = router;
