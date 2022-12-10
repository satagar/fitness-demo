'use strict';
const appointment = require("./appointment");
const doctor = require("./doctor");
const healthLog = require("./health-log");
const hospital = require("./hospital");
const prescription = require("./prescription");
const user = require("./user");

module.exports = {
    User: user,
    Doctor: doctor,
    Hospital: hospital,
    HealthLog: healthLog,
    Appointment: appointment,
    Prescription: prescription
}