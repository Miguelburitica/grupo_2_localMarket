const express = require('express')
const router = express.Router()
const { apiUsersController } = require('../controllers')

router.get('/:id', apiUsersController.getOne)
router.get('/', apiUsersController.getUsers)

module.exports = router