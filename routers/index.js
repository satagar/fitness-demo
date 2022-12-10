const express = require('express');
const webRouter = require('./web');
const { apiRouter, apiRouterSecure } = require('./api');

const masterRouter = express.Router();

masterRouter.use('/', webRouter);
masterRouter.use('/api', apiRouter);
masterRouter.use('/api', apiRouterSecure);

module.exports = masterRouter;