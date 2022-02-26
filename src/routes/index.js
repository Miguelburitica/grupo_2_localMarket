const express = require('express')
const router = express.Router()
const { controller } = require('../controllers')
const userRoutes = require('./user.routes')
const api = require('./api')
const productRoutes = require('./product.routes')

// GET home page.
router.get('/', controller.showHome)

router.use('/users', userRoutes)

router.use('/products', productRoutes)

router.use('/api', api)

// router.use('/api', apiRouter);

module.exports = router
