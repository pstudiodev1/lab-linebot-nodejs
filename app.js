const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {xxxxxxx}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

app.post('/webhook', (req, res) => {
    console.log('POST ==> /webhook');
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
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