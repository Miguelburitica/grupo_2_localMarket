const express = require('express')
const router = express.Router()
const { apiProductController } = require('../../controllers')

// get an array with all products
router.get('/', apiProductController.getAll)

// get just one product
router.get('/:id', apiProductController.getOne)

// get just one product
router.put('/', apiProductController.updateOne)

module.exports = router