const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Prescription, HealthLog } = require("../models");

const index = async (req, res) => {
    await Prescription.find({
        patient: req.user.id
    }).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Prescription.create({
        patient: req.user.id,
        doctor: req.body.doctorId,
        hospital: req.body.hospitalId,
        date: req.body.date,
        symptops: req.body.symptops,
        advice: req.body.advice,
        medications: req.body.medications,
        healthLog: req.body.healthLogId
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const createWithHealthLog = async (req, res) => {
    await Prescription.create({
        patient: req.user.id,
        doctor: req.body.doctorId,
        hospital: req.body.hospitalId,
        date: req.body.date,
        symptops: req.body.symptops,
        advice: req.body.advice,
        medications: req.body.medications,
        healthLog: new HealthLog({
            height: req.body.height,
            weight: req.body.weight,
            bloodGroup: req.body.bloodGroup,
            bloodPressure: req.body.bloodPressure,
            pulse: req.body.pulse,
            oxygenLevel: req.body.oxygenLevel
        })
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    await Prescription.findOne({
        _id: req.params.id,
        patient: req.user.id
    }).then(data => {
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
    await Prescription.findOne({
        _id: req.params.id,
        patient: req.user.id
    }).then(data => {
        if(data) {
            if(req.body.doctorId) data.doctor = req.body.doctorId;
            if(req.body.hospitalId) data.hospital = req.body.hospital;
            if(req.body.date) data.date = req.body.date;
            if(req.body.symptops) data.symptops = req.body.symptops;
            if(req.body.advice) data.advice = req.body.advice;
            if(req.body.medications) data.medications = req.body.medications;
            if(req.body.healthLogId) data.healthLog = req.body.healthLogId;
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
    Prescription.findOne({
        _id: req.params.id,
        patient: req.user.id
    }).then(data => {
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
    createWithHealthLog: createWithHealthLog,
    read: read,
    update: update,
    destroy: destroy
}