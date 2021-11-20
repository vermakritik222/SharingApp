const express = require('express');
const path = require('path');
const donenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/api/files', require('./router/file'));
app.use('/files/download', require('./router/download'));
app.use('/files', require('./router/show'));

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`server is running on ${port} .......`);
});
