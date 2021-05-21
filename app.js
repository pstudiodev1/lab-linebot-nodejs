const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const AIMLParser = require('aimlparser');

const app = express();
const port = process.env.PORT || 4000;
const aimlParser = new AIMLParser({ name:'HelloBot' });
aimlParser.load(['./aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {o34/mccX3IEkCbi+HtubJTIAEHOR7iT7uptpbU/huWMWS86rpydlbnm9nLmxUBoJwebLI1xW3x5xJwbCw42bqbaS5hTbtg2fl24I+DBkK3KJZtcHOY3jH/Rj8xyRhpfEpJcV6lmmaC9+nFEE4X6o7gdB04t89/1O/w1cDnyilFU=}'
    }
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

//
// Webhook calling from line api.
//
app.post('/webhook', (req, res) => {
    console.log('POST ==> /webhook');
    // Get reply token and message
    let reply_token = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text
    // Process message.
    aimlParser.getResult(msg, (answer, wildCardArray, input) => {
        reply(reply_token, answer)
    })
    // Reply.
    reply(reply_token, msg)
    res.sendStatus(200);
});

//
// Start server.
//
app.listen(port);
console.log('Server is running on ' + port);