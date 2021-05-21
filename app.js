const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.post('/webhook', (req, res) => {
    console.log('POST ==> /webhook');
    res.sendStatus(200);
});

app.get('/webhook', (req, res) => {
    console.log('GET ==> /webhook');
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    console.log('GET ==> /');
    res.sendStatus(200);
});

app.listen(port);
console.log('Server is running on ' + port);