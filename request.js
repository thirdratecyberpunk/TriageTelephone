'use strict'

const app = require('express')();
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
apiKey: "381c261f",
apiSecret: "qagg4QeCsqR4lEwW",
applicationId: 'a041c34d-3a43-4409-ac89-dce180907622',
privateKey:  require('fs').readFileSync('server/private.key')
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(process.env.PORT || 80, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.get('/answer', function (req, res) {
const ncco = [
{
action: 'talk',
voiceName: 'Jennifer',
text: 'Hello, thank you for calling. This is Jennifer from Nexmo. Ciao.'
},
{
  action: "record",
  eventUrl: ["https://0759ca2b.ngrok.io/voicemail"],
  endOnSilence: "3",
  endOnKey: "#",
  beepStart: "true"
},
{
  action: "talk",
  text: "Butts lol"
}
]
res.send(ncco);
});

app.post('/event', function (req, res) {
console.log(req.body);
res.status(204).end();
});

app.post('/voicemail', function (req, res) {
console.log(req.body);
var recording_url = req.body.recording_url;
var recording_audio = recording_url.split('/').pop() + '.mp3';
nexmo.files.save(recording_url, recording_audio, (err, response) => {
  if (response){console.log("Audio downloaded");}
});
res.status(204).end();
});
