const express = require('express');
const apiUsers = express.Router();
const { apiUsersController } = require('../../controller/apiController')

apiUsers.get('/:id', apiUsersController.getOne);
apiUsers.get('/', apiUsersController.getUsers);

module.exports = apiUsers;