const express = require('express');
const router = express.Router();
const { controller } = require('../controllers');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
// const {apiRouter} = require('./apiRouter')

// GET home page.
router.get('/', controller.showHome);

router.use('/users', userRoutes);

router.use('/products', productRoutes);

// router.use('/api', apiRouter);

module.exports = router;
