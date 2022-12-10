const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

let db;

module.exports = {
    connect: async () => {
        if(!db) {
            db = await MongoMemoryServer.create();
            await mongoose.connect(db.getUri())
        }
    },

    clear: async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    },

    close: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if(db) await db.stop();
    }
}