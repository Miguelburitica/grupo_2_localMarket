const express = require("express");
const router = express.Router();
const controller = require('../controllers/product.controllers')

// GET product-detail page.
router.get('/product-detail', controller.showProductDetail);

// GET shopping-cart page.
router.get('/shopping-cart', controller.showShoppingCart);

module.exports = router