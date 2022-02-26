const express = require('express')
const router = express.Router()
const { apiProductController } = require('../../controllers')

console.log('Hii')
router.get('/', apiProductController.getAll)

module.exports = router