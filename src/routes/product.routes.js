const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { productController } = require('../controllers');
const { check } = require('express-validator');

let validateAddItem = [
	check('name').notEmpty().withMessage('Este campo es obligatorio'),
	check('category').notEmpty().withMessage('Selecciona la categoria a la que mejor se ajuste el producto'),
	check('unidad').notEmpty().withMessage('Este campo es obligatorio').bail()
	.isInt()
	.withMessage('Escribe el precio por unidad sin puntos ni comas'),
	check('discount').notEmpty().withMessage('Selecciona el porcentaje de descuento'),
	check('market').notEmpty().withMessage('Selecciona el mercado campesino en el que venderás tus productos'),
]
let validateEditItem = [
	check('name').notEmpty().withMessage('Este campo es obligatorio'),
	check('category').notEmpty().withMessage('Selecciona la categoria a la que mejor se ajuste el producto'),
	check('unidad').notEmpty().withMessage('Este campo es obligatorio').bail()
	.isInt()
	.withMessage('Escribe el precio por unidad sin puntos ni comas'),
	check('discount').notEmpty().withMessage('Selecciona el porcentaje de descuento'),
	check('market').notEmpty().withMessage('Selecciona el mercado campesino en el que venderás tus productos'),
]

//Para guardar
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/images'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

//Middleware para guardar archivos
const uploadFile = multer({ storage });

// LISTADO DE PRODUCTOS DEL VENDEDOR
router.get('/list', productController.showList);

// LISTADO DE PRODUCTOS DE CARA AL COMPRADOR
router.get('/catalog', productController.showCatalog);

//CREACIÓN DE PRODUCTOS
router.get('/add-item', productController.showAddItem);
router.post('/add-item', uploadFile.single('imagefile'),validateAddItem, productController.storeAddItem);

// EDICIÓN DE PRODUCTOS
// Mostrar el producto a editar.
router.get('/edit-item/:id', productController.showEditItem);
// Manda la info editada y redirige al detalle de producto.
router.post('/edit-item/:id', uploadFile.single('imagefile'),validateEditItem, productController.updateItem);

// DETALLE DE UN PRODUCTO
router.get('/detail/:id?', productController.showDetail);

//ELIMINAR PRODUCTOS
router.delete('/:id', productController.deleteItem);
// GET shopping-cart page.
router.get('/shopping-cart', productController.showShoppingCart);

module.exports = router;
