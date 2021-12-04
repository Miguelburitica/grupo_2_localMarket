const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

// GET Seller page.
router.get('/sellerProfile', userController.showSellerProfile);

// GET Login page.
router.get('/login', userController.showLogin);

// Get Sign-in page
router.get('/sign-in-consumer', userController.showSignInConsumer);

// Get Sign-in page
router.get('/sign-in-seller', userController.showSignInSeller);


module.exports = router;
