const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

// GET Seller page.
router.get('/seller', userController.showSellerProfile);
// GET Customer page.
router.get('/customer', userController.showCustomerProfile);

// Mostrar el login.
router.get('/login', userController.showLogin);
// Enviar los datos del login.
router.post('/login', userController.processLogin);


// Get Sign-in page comprador
router.get('/sign-in-customer', userController.showSignInCustomer);
// Enviar datos de registro de comprador
router.post('/sign-in-customer', userController.addUser);

// Get Sign-in page vendedor
router.get('/sign-in-seller', userController.showSignInSeller);
//  Enviar datos de registro de vendedor
router.post('/sign-in-seller', userController.addUser);

module.exports = router;
