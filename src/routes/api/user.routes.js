const express = require('express')
const router = express.Router()
const { apiUserController } = require('../../controllers')
const cors = require('cors')

router.get('/:id', apiUserController.getOne)
router.get('/',cors(), apiUserController.getUsers)

module.exports = router