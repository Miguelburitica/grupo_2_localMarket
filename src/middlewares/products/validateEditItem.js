const { check } = require('express-validator');

const validateEditItem = [
	check('name')
		.notEmpty()
		.withMessage('Hey! tu producto debe tener un nombre >:#')
		.isLength({ min: 3, max: 45 })
		.withMessage('Para que el nombre sea valido debe tener mín 3 letras y max 45 :3'),
	check('category')
		.notEmpty()
		.withMessage('Selecciona la categoria a la que mejor se ajuste el producto')
		.isInt()
		.withMessage('Que carajos acabas de hacer?, como hiciste eso?, hey trata de no romperlo :P'),
	check('kilo')
		.notEmpty()
		.withMessage('Si no lo venderás por kilo, pon un cero :3')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por kilo sin puntos ni comas'),
	check('image')
		.custom((value, { req }) => {
			let format = req.file.mimetype;
			console.log(req.file);
			let formats = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
			return formats.includes(format);
		})
		.withMessage('Sólo es permitido subir archivos jpg, png, jpeg y gif, srry :('),
	check('unit')
		.notEmpty()
		.withMessage('Si no lo venderás por unidad, pon un cero :3')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por unidad sin puntos ni comas'),
	check('discount').notEmpty().withMessage('Selecciona el porcentaje de descuento'),
	check('market').notEmpty().withMessage('Selecciona el mercado campesino en el que venderás tus productos'),
];

module.exports = validateEditItem;
