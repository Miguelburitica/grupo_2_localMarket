const express = require('express')
const router = express.Router()

const users = require('./user.routes')
const products = require('./product.routes')


router.use('/products', products)
router.use('/users', users)

module.exports = router