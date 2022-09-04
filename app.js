'use strict';

// build in
const http = require('http')
const path = require('path');

// external modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// own modules
const logger = require('./logger');
const { nextTick } = require('process');

const app = express();

app.use(cors());

// jede Middleware sieht folgendermaßen aus
// app.use((req, res, next) => { 
//  ...
//  next() 
// });
// da kann man alles mögliche selber als Middleware implementieren
// hier jetzt ein git test text

app.use(logger({
    level: 'debug'
}));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'html')));

app.get('/names', (req, res) => {
    const person = {
        'firstname': 'Enya',
        'lastname': 'Kaemper'
    };
    res.send(person);
});

//curl -X POSTT -d {"user": "enya"} -H "Content-Type: application/json" http://localhost:3000/new
// sollte den body einfach zurückgeben
app.post('/new', (req, res) => {
     res.send(req.body);
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is listening on port 3000.\n');
});