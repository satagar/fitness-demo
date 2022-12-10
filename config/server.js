const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_LIFESPAN: process.env.JWT_LIFESPAN || 600
}