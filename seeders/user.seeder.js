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
                gender: gender
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}