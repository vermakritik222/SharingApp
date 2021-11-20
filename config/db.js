const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
// DB connection
const DB = process.env.MONGO_CONNECTION_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_CONNECTION_PASSWORD
);

function connectDB() {
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true, // to remove error on consol
    });

    const connection = mongoose.connection;

    connection
        .once('open', () => {
            console.log('DB is connected to app.....');
        })
        .catch((err) => {
            console.log(`db error ${err.message}`);
        });
}

module.exports = connectDB;
