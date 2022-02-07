const { check } = require('express-validator')
// const { categoryModel, marketModel } = require('../../model')

const validateEditItem = [
	check('name')
		.notEmpty()
		.withMessage('Hey! tu producto debe tener un nombre >:#')
		.isLength({ min: 5, max: 45 })
		.withMessage('Para que el nombre sea valido debe tener mín 5 caracteres y max 45 caracteres :3'),
	check('category')
		.notEmpty()
		.withMessage('Selecciona la categoria a la que mejor se ajuste el producto')
		.bail()
		.isInt()
		.withMessage('Que carajos acabas de hacer?, como hiciste eso?, hey trata de no romperlo :P'),
	check('kilo')
		.notEmpty()
		.withMessage('Si no lo venderás por kilo, pon un cero :3')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por kilo sin puntos ni comas')
		.bail()
		.isLength({ max: 6 })
		.withMessage('El precio no puede sobrepasar los 6 digitos compa :D'),
	check('image')
		.custom((value, { req }) => {
			let response
			if (req.file === undefined) {
				response = true
			} else {
				let format = req.file.mimetype
				console.log(format)
				let formats = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg', undefined]
				response = formats.includes(format)
			}
			return response
		})
		.withMessage('Sólo es permitido subir archivos jpg, png, jpeg y gif, srry :('),
	check('unit')
		.notEmpty()
		.withMessage('Si no lo venderás por unidad, pon un cero :3')
		.bail()
		.isInt()
		.withMessage('Escribe el precio por unidad sin puntos ni comas')
		.bail()
		.isLength({ max: 6 })
		.withMessage('El precio no puede sobrepasar los 6 digitos compa :D'),
	check('discount').notEmpty().withMessage('Selecciona el porcentaje de descuento'),
	check('market')
		.notEmpty()
		.withMessage('Selecciona el mercado campesino en el que venderás tus productos')
		.bail()
		.isInt()
		.withMessage('Que carajos acabas de hacer?, como hiciste eso?, hey trata de no romperlo :P'),
]

module.exports = validateEditItem
