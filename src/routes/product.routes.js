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
router.post('/add-item', uploadFile.single('imagefile'), productController.storeAddItem);

// EDICIÓN DE PRODUCTOS
router.get('/edit-item', productController.showEditItem);

// DETALLE DE UN PRODUCTO
router.get('/detail/:id?', productController.showDetail);

//ELIMINAR PRODUCTOS
router.delete('/:id', productController.deleteItem);
// GET shopping-cart page.
router.get('/shopping-cart', productController.showShoppingCart);

module.exports = router;
