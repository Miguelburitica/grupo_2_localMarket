const express = require('express');
const router = express.Router();
const controller = require('../../controllers/products/product.controllers');

// GET Create-edit page.
router.get('/create-edit', controller.showCreateEdit);

// GET edit-item.
router.get('/edit-item', controller.showEditItem);

// GET add-item.
router.get('/add-item', controller.showAddItem);

// GET product-detail page.
router.get('/detail/:id?', controller.showDetail);

// GET shopping-cart page.
router.get('/shopping-cart', controller.showShoppingCart);

module.exports = router;
