'use strict';
const userSeeder = require("./user.seeder");
const hospitalSeeder = require("./hospital.seeder");
const doctorSeeder = require("./doctor.seeder");
const { dbConnect } = require("../helpers");

let exitAfterSeeding = false;

module.exports = {
    seedAll: async () => {
        await dbConnect().then(async () => {
            await userSeeder.seed(5);
            await hospitalSeeder.seed(5);
            await doctorSeeder.seed(5);
        }).catch(err => console.log(`Failed to run seeders because:\n${err}`));
        if(exitAfterSeeding) process.exit();
    }
}

if(process.argv.includes('seed')) {
    exitAfterSeeding = true;
    module.exports.seedAll();
}