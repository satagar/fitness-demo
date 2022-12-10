const express = require('express');

const webRouter = express.Router();

webRouter.get('/', (req, res) => {
    res.status(200).send('<h1>You have reached the Web service successfully!</h1>');
})

module.exports = webRouter;