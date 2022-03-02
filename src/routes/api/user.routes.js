const express = require('express')
const router = express.Router()
const { apiUserController } = require('../../controllers')

router.get('/customers',apiUserController.getCustomer)
router.get('/:id', apiUserController.getOne)
router.get('/', apiUserController.getUsers)

module.exports = router