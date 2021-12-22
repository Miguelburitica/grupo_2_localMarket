const path = require('path');

// validaciones para users
const authSellerMiddleware = require(path.resolve(__dirname, './users/authSellerMiddleware'));
const authMiddleware = require(path.resolve(__dirname, './users/authMiddleware'));
const guestMiddleware = require(path.resolve(__dirname, './users/guestMiddleware'));
const userLoggedMiddleware = require(path.resolve(__dirname, './users/userLoggedMiddleware'));
const validateRegisterSeller = require(path.resolve(__dirname, './users/validateRegisterSeller'));
const validateRegisterCustomer = require(path.resolve(__dirname, './users/validateRegisterCustomer'));
const validateLogin = require(path.resolve(__dirname, './users/validateLogin'));

// validaciones para products
const validateAddItem = require(path.resolve(__dirname, './products/validateAddItem'));
const validateEditItem = require(path.resolve(__dirname, './products/validateEditItem'));

module.exports = {
	// validaciones para users
	authMiddleware,
	authSellerMiddleware,
	guestMiddleware,
	userLoggedMiddleware,
	validateRegisterSeller,
	validateRegisterCustomer,
	validateLogin,

	// validaciones para products
	validateAddItem,
	validateEditItem,
};
