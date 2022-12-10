'use strict';
const doctor = require("./doctor");
const hospital = require("./hospital");
const user = require("./user");

module.exports = {
    User: user,
    Doctor: doctor,
    Hospital: hospital
}