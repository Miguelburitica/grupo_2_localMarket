const express = require('express');
const router = express.Router();
const controller = require('../controllers/main.controllers');

// GET home page.
router.get('/', controller.showHome);

module.exports = router;
