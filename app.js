const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const coresOptions = {
    origin: ['http://127.0.0.1:8000'],
};
app.use(cors(coresOptions));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/index.html`);
});
app.use('/api/files', require('./router/file'));
app.use('/files/download', require('./router/download'));
app.use('/files', require('./router/show'));

module.exports = app;
