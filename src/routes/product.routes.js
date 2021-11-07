const express = require("express");
const router = express.Router();
const controller = require('../controllers/product.controllers')

// GET Create-edit page.
router.get('/create-edit', controller.showCreateEdit);

// GET product-detail page.
router.get('/detail', controller.showProductDetail);

// GET shopping-cart page.
router.get('/shopping-cart', controller.showShoppingCart);

module.exports = router