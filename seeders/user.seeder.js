const { faker } = require('@faker-js/faker');
const { randomItem } = require('../helpers');
const { User } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await User.deleteMany();
        for(let i = 0; i < count; i++) {
            const gender = randomItem(User.genders);
            await User.create({
                name: faker.name.fullName(gender),
                email: faker.internet.email(),
                password: '123456',
                gender: gender,
                height: faker.datatype.number({ min: 5, max: 6, precision: 0.01 }),
                weight: faker.datatype.number({ min: 50, max: 70, precision: 0.01 }),
                bloodGroup: randomItem(User.bloodGroups),
                bloodPressure: faker.datatype.number({ min: 80, max: 120 }),
                pulse: faker.datatype.number({ min: 90, max: 110 }),
                oxygenLevel: faker.datatype.number({ min: 50, max: 100 }),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}