const express = require('express')
const router = express.Router()

const users = require('./user.routes')
const products = require('./product.routes')
const categories = require('./category.routes')
const markets = require('./market.routes')


router.use('/products', products)
router.use('/users', users)
router.use('/markets', markets)
router.use('/categories', categories)

module.exports = router