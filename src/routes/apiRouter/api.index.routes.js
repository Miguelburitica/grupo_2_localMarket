const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/users', require('./api.users.routes'));

module.exports = apiRouter;