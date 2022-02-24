const express = require('express')
const router = express.Router()
const { controller } = require('../controllers')
const userRoutes = require('./user.routes')
const apiUsersRoutes = require('./api.users.routes')
const productRoutes = require('./product.routes')

// GET home page.
router.get('/', controller.showHome)

router.use('/users', userRoutes)

router.use('/products', productRoutes)

router.use('/apiUsers', apiUsersRoutes)

// router.use('/api', apiRouter);

module.exports = router
