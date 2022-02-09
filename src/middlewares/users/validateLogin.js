const { check } = require('express-validator');

const validateLogin = [
	check('email')
		.notEmpty()
		.withMessage('Este campo no puede estar vacio.')
		.isEmail()
		.withMessage('Ingresa un correo válido como "ejemplo@organizacion.tipo"'),
	check('password')
		.notEmpty()
		.withMessage('Este campo no puede estar vacio.')
		.bail()
		.isLength({min:10})
		.withMessage('La contraseña debe tener un mínimo de 10 caracteres'),
];

module.exports = validateLogin;
