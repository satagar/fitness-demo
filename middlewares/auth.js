const { verifyAccessToken } = require("../helpers");
const { User } = require("../models");

module.exports = {
    authenticate: async (req, res, next) => {
        const authorization = req.header('Authorization') || '';
        const token = authorization.split(' ')[1];
        if(!token) {
            res.status(401).send({ message: 'Token not found' });
            return;
        }
        const payload = await verifyAccessToken(token);
        if(payload) {
            req.user = payload;
            return next();
        }
        res.status(403).send({ message: 'Token invalid or expired' });
        return;
    },

    authorize: async (req, res, next) => {
        return module.exports.authorizeRoles(['user'])(req, res, next);
    },

    authorizeRoles: roles => {
        return async (req, res, next) => {
            if(req.user) {
                const authorized = Array.isArray(roles) ? roles.includes(req.user.role) : roles === req.user.role;
                if(authorized) return next();
            }
            res.status(403).send({ message: 'Permission not granted' });
            return;
        }
    }
}