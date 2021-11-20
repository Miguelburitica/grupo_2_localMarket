const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { productController } = require('../controllers');

//Para guardar
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/images'));
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

//Middleware para guardar archivos
const uploadFile = multer({ storage });

// LISTADO DE PRODUCTOS
router.get('/list', productController.showCreateEdit);

//CREACIÓN DE PRODUCTOS
router.get('/add-item', productController.showAddItem);
router.post(
	'/add-item',
	uploadFile.single('imagefile'),
	productController.storeAddItem
);

// EDICIÓN DE PRODUCTOS
router.get('/edit-item', productController.showEditItem);

// DETALLE DE UN PRODUCTO
router.get('/detail/:id?', productController.showDetail);

//ELIMINAR PRODUCTOS

// GET shopping-cart page.
router.get('/shopping-cart', productController.showShoppingCart);

module.exports = router;
