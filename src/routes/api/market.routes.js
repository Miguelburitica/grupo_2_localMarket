const express = require('express')
const router = express.Router()
const { apiMarketController } = require('../../controllers')

// get an array with all products
router.get('/', apiMarketController.getAll)

// get just one product
router.get('/:id', apiMarketController.getOne)

// get just one product
router.put('/', apiMarketController.updateOne)

module.exports = router