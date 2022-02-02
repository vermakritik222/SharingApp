const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
// DB connection
const DB = process.env.MONGO_CONNECTION_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_CONNECTION_PASSWORD
);

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

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`server is running on ${port} .......`);
});
