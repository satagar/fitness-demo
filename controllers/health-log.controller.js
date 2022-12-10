const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { HealthLog } = require("../models");

const index = async (req, res) => {
    await HealthLog.find({
        user: req.user.id
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await HealthLog.create({
        user: req.user.id,
        height: req.body.height,
        weight: req.body.weight,
        bloodGroup: req.body.bloodGroup,
        bloodPressure: req.body.bloodPressure,
        pulse: req.body.pulse,
        oxygenLevel: req.body.oxygenLevel
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    await HealthLog.findById(req.params.id).then(data => {
        if(data) {
            res.status(200).json(data);
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    await HealthLog.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.height) data.height = req.body.height;
            if(req.body.weight) data.weight = req.body.weight;
            if(req.body.bloodGroup) data.bloodGroup = req.body.bloodGroup;
            if(req.body.bloodPressure) data.bloodPressure = req.body.bloodPressure;
            if(req.body.pulse) data.pulse = req.body.pulse;
            if(req.body.oxygenLevel) data.oxygenLevel = req.body.oxygenLevel;
            if(data.isModified()) {
                data.save().then(data => {
                    res.status(200).json(data);
                }).catch(error => {
                    handleServerErrorResponse(res, error);
                });
            }
            else {
                res.status(200).json(data);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    if(req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannot delete Self');
    HealthLog.findById(req.params.id).then(data => {
        if(data) {
            data.deleteOne({ _id: req.params.id }).then(data => {
                res.status(200).json(data);
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}