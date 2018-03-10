'use strict'

const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(process.env.PORT || 80, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// app.get('/', function (req, res){
//   console.log("Hello!");
// })

app.get('/answer', function (req, res) {
const ncco = [
{
action: 'talk',
voiceName: 'Jennifer',
text: 'Hello, thank you for calling. This is Jennifer from Nexmo. Ciao.'
}
];
res.json(ncco);
});

app.post('/event', function (req, res) {
console.log(req.body);
res.status(204).end();
});
