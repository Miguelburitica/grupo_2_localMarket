const express = require('express')
const router = express.Router()
const { apiCategoryController } = require('../../controllers')

// get an array with all products
router.get('/', apiCategoryController.getAll)

// get just one product
router.get('/:id', apiCategoryController.getOne)

// get just one product
router.put('/', apiCategoryController.updateOne)

module.exports = router