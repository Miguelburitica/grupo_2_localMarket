const { check } = require('express-validator');

const validateAddItem = [
	check('name').notEmpty().withMessage('Este campo es obligatorio'),
	check('category').notEmpty().withMessage('Selecciona la categoria a la que mejor se ajuste el producto'),
	check('unidad')
		.notEmpty()
		.withMessage('Este campo es obligatorio')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por unidad sin puntos ni comas'),
	check('kilo')
		.notEmpty()
		.withMessage('Este campo es obligatorio')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por unidad sin puntos ni comas'),
	check('discount').notEmpty().withMessage('Selecciona el porcentaje de descuento'),
	check('market').notEmpty().withMessage('Selecciona el mercado campesino en el que venderás tus productos'),
];

module.exports = validateAddItem;
