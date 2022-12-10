const { faker } = require('@faker-js/faker');
const { Doctor, Hospital } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Doctor.deleteMany();
        for(let i = 0; i < count; i++) {
            await Doctor.create({
                name: faker.name.fullName(),
                specialization: faker.lorem.words(1),
                qualifications: faker.helpers.uniqueArray(faker.lorem.words(1), 5),
                hospital: (await Hospital.aggregate([{ $sample: { size: 1 } }])).find(() => true),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}