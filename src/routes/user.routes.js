const express = require('express');
const router = express.Router();
const multer = require('multer');
const { userController } = require('../controllers');
const path = require('path');
const {
	validateRegisterSeller,
	validateRegisterCustomer,
	authMiddleware,
	guestMiddleware,
	validateLogin,
} = require('../middlewares/');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/images/users'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const uploadFile = multer({ storage });

// GET Seller page.
router.get('/seller', authMiddleware, userController.getSellerProfile);
// GET Customer page.
router.get('/customer', authMiddleware, userController.getCustomerProfile);

// Mostrar el login.
router.get('/login', guestMiddleware, userController.getLogin);
// Enviar los datos del login.
router.post('/login', validateLogin, userController.processLogin);

// Get Sign-in page comprador
router.get('/sign-in-customer', guestMiddleware, userController.getSignInCustomer);
// Enviar datos de registro de comprador
router.post('/sign-in-customer', uploadFile.single('photo'), validateRegisterCustomer, userController.addUser);

//Get edit customer
router.get('/edit-customer/:id', userController.editUser);
//Enviar formulario edit customer
router.put('/edit-customer/:id', uploadFile.single('photo'), userController.updateUser);

// Get Sign-in page vendedor
router.get('/sign-in-seller', guestMiddleware, userController.getSignInSeller);
// Enviar datos de registro de vendedor
router.post('/sign-in-seller', uploadFile.single('photo'), validateRegisterSeller, userController.addUser);

//Get edit seller
router.get('/edit-seller/:id', userController.editUser);
//Enviar formulario edit seller
router.put('/edit-seller/:id', uploadFile.single('photo'), userController.updateUser);

//Get Cerrar sesión
router.get('/logout', userController.logout);

//Get página de error 404
router.get('/error', userController.getError);

module.exports = router;