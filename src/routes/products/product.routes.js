const express = require('express');
const router = express.Router();
const multer = require('multer');
const path= require('path');
const controller = require('../../controllers/products/product.controllers');

//Para guardar
const storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, path.resolve(__dirname, '../../../public/images'))
	},
	filename : function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

//Middleware para guardar archivos
const uploadFile = multer({ storage });

// LISTADO DE PRODUCTOS
router.get('/create-edit', controller.showCreateEdit);

//CREACIÓN DE PRODUCTOS 
router.get('/add-item', controller.showAddItem);
router.post('/',uploadFile.single('imagefile'),controller.storeAddItem);

// EDICIÓN DE PRODUCTOS
router.get('/edit-item', controller.showEditItem);

// DETALLE DE UN PRODUCTO
router.get('/detail/:id?', controller.showDetail);

//ELIMINAR PRODUCTOS

// GET shopping-cart page.
router.get('/shopping-cart', controller.showShoppingCart);

module.exports = router;
