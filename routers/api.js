const express = require('express');

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};