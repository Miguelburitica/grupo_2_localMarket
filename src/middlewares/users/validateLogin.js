const { check } = require('express-validator');

const validateLogin = [
	check('email')
		.notEmpty()
		.withMessage('Escribe con el que te registraste el Local Market')
		.isEmail()
		.withMessage('Ingresa un correo válido como "ejemplo@organizacion.tipo"'),
];

module.exports = validateLogin;
