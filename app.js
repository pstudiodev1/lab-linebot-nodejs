const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {o34/mccX3IEkCbi+HtubJTIAEHOR7iT7uptpbU/huWMWS86rpydlbnm9nLmxUBoJwebLI1xW3x5xJwbCw42bqbaS5hTbtg2fl24I+DBkK3KJZtcHOY3jH/Rj8xyRhpfEpJcV6lmmaC9+nFEE4X6o7gdB04t89/1O/w1cDnyilFU=}'
    }
    // let body = JSON.stringify({
    //     replyToken: reply_token,
    //     messages: [{
    //         type: 'text',
    //         text: 'Hello'
    //     },
    //     {
    //         type: 'text',
    //         text: 'How are you?'
    //     }]
    // })
    // request.post({
    //     url: 'https://api.line.me/v2/bot/message/reply',
    //     headers: headers,
    //     body: body
    // }, (err, res, body) => {
    //     console.log('status = ' + res.statusCode);
    // });
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
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
    // console.log(req.body);
    // let reply_token = req.body.events[0].replyToken;
    // reply(reply_token);
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
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