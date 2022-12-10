const express = require('express');
const authController = require('../controllers/auth.controller');
const healthLogController = require('../controllers/health-log.controller');
const { authenticate, authorize, authorizeRoles } = require('../middlewares/auth');
const validator = require('../middlewares/validators');

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route('/register').post(validator.authRegister, authController.register);
apiRouter.route('/login').post(validator.authLogin, authController.login);
apiRouter.route('/logout').post(authController.logout);
apiRouter.route('/refresh').post(validator.authRefresh, authController.refresh);

apiRouterSecure.use(authenticate);

apiRouterSecure.route('/logs')
    .get(authorize, healthLogController.index)
    .post(authorize, validator.healthLogCreate, healthLogController.create);

apiRouterSecure.route('/students/:id')
    .get(authorize, healthLogController.read)
    .put(authorize, validator.healthLogUpdate, healthLogController.update)
    .delete(authorize, healthLogController.destroy);

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};