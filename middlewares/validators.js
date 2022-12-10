const { check, validationResult } = require('express-validator');
const { Admin, Student, Company, Job, User, HealthLog } = require("../models");

const roles = ['admin', 'student', 'company'];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
}

module.exports = {
    authRegister: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return Company.findOne({ email: value }).then(company => { if(company) return Promise.reject('Company Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('gender').trim().escape().not().isEmpty().withMessage('Gender cannot be empty').bail().custom(value => {
            if(!User.genders.includes(value)) throw new Error(`Gender is invalid. Please provide any of: ${User.genders.join()}`);
        }),
        handleValidation
    ],
    authLogin: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail(),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail(),
        handleValidation
    ],
    authRefresh: [
        check('accessToken').trim().escape().not().isEmpty().withMessage('Access token cannot be empty').bail(),
        check('refreshToken').trim().escape().not().isEmpty().withMessage('Refresh token cannot be empty').bail(),
        handleValidation
    ],
    healthLogCreate: [
        check('height').trim().escape().not().isEmpty().withMessage('Height cannot be empty').bail().isNumeric().withMessage('Height must be a number').bail(),
        check('weight').trim().escape().not().isEmpty().withMessage('Weight cannot be empty').bail().isNumeric().withMessage('Weight must be a number').bail(),
        check('bloodGroup').trim().escape().not().isEmpty().withMessage('Blood Group cannot be empty').bail().custom(value => {
            if(!HealthLog.bloodGroups.includes(value)) throw new Error(`Blood Group is invalid. Please provide any of: ${HealthLog.bloodGroups.join()}`);
        }),
        check('bloodPressure').trim().escape().not().isEmpty().withMessage('Blood Pressure cannot be empty').bail().isNumeric().withMessage('Blood Pressure must be a number').bail(),
        check('pulse').trim().escape().not().isEmpty().withMessage('Pulse cannot be empty').bail().isNumeric().withMessage('Pulse must be a number').bail(),
        check('oxygenLevel').trim().escape().not().isEmpty().withMessage('Oxygen Level cannot be empty').bail().isNumeric().withMessage('Oxygen Level must be a number').bail(),
        handleValidation
    ],
    healthLogUpdate: [
        check('height').trim().escape().not().isEmpty().withMessage('Height cannot be empty').bail().isNumeric().withMessage('Height must be a number').bail(),
        check('weight').trim().escape().not().isEmpty().withMessage('Weight cannot be empty').bail().isNumeric().withMessage('Weight must be a number').bail(),
        check('bloodGroup').trim().escape().not().isEmpty().withMessage('Blood Group cannot be empty').bail().custom(value => {
            if(!HealthLog.bloodGroups.includes(value)) throw new Error(`Blood Group is invalid. Please provide any of: ${HealthLog.bloodGroups.join()}`);
        }),
        check('bloodPressure').trim().escape().not().isEmpty().withMessage('Blood Pressure cannot be empty').bail().isNumeric().withMessage('Blood Pressure must be a number').bail(),
        check('pulse').trim().escape().not().isEmpty().withMessage('Pulse cannot be empty').bail().isNumeric().withMessage('Pulse must be a number').bail(),
        check('oxygenLevel').trim().escape().not().isEmpty().withMessage('Oxygen Level cannot be empty').bail().isNumeric().withMessage('Oxygen Level must be a number').bail(),
        handleValidation
    ]
}