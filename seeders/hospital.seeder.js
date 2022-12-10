const { faker } = require('@faker-js/faker');
const { Hospital } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Hospital.deleteMany();
        for(let i = 0; i < count; i++) {
            await Hospital.create({
                name: faker.name.fullName(),
                location: faker.address.city()
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}