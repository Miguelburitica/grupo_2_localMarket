const express = require('express')
const router = express.Router()
const { apiUserController } = require('../../controllers')

router.get('/:id', apiUserController.getOne)
router.get('/', apiUserController.getUsers)

module.exports = router