'use strict'

const app = require('express')();
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');

// array of questions to ask the user
var questions = [
   "I have little interest or pleasure in doing things.",
   "I feel down, depressed or hopeless.",
   "I have had trouble falling or staying asleep, or slept too much.",
   "I feel tired and have little energy.",
   "I have a poor appetite, or have been overeating.",
   "I feel bad about myself, and feel that I am a failure.",
   "I have trouble concentrating on tasks such as reading the news or watching television.",
   "I move or speak so slowly that others notice, or am fidgety and restless.",
   "I have had suicidal thoughts, or thoughts of self harm."
];

// array containing user's responses
var answers = [];

const nexmo = new Nexmo({
apiKey: "381c261f",
apiSecret: "qagg4QeCsqR4lEwW",
applicationId: 'a041c34d-3a43-4409-ac89-dce180907622',
privateKey:  require('fs').readFileSync('server/private.key')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(process.env.PORT || 3000, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

var introduction = "Hello, I'm Doctor Dan and I'm here to run you through your Triage test, "
+ " I will ask you to consider 9 statements in order to prepare you for your appointment, " +
" This process will take about 10 minutes to complete, I hope that is alright with you, "
+ "Using the keypad, please rate from 0-4, 0 being not at all and 4 being almost daily,"
+ "over the last 2 weeks, how often have you been bothered by the following problems? Please press any key to begin.";

// introduction = "DEVELOPER'S TEXT. Press a button for now."

app.get('/answer', function (req, res) {
    // array containing user's answers to questions
    const ncco = [
    {
      "action": "talk",
      "text": introduction
    },
    {
      "action": "input",
      "maxDigits": "1",
      "timeOut": "30",
      "bargeIn": "false",
      "eventUrl": ["http://24773dcf.ngrok.io/inputresponse"]
    }
  ];
  res.send(ncco);
});

// event called when user adds an answer to
app.post('/inputresponse', function (req, res){
  answers.push(req.body.dtmf);
  // if there are still questions to be answered
  var ncco;
  if (answers.length != questions.length){
    ncco = [
      {
        "action": "talk",
        "text": questions[answers.length - 1]
      },
      {
        "action": "input",
        "maxDigits": "1",
        "timeOut": "30",
        "bargeIn": "false",
        "eventUrl": ["http://24773dcf.ngrok.io/inputresponse"]
      }
    ];
  }
  // if the user has answered every question
  else{
    console.log(answers);
    // removes the first element from the list
    answers.shift();
    ncco = [
      {
        "action": "talk",
        "text": "Thank you for using this service!"
      }
    ]
  }
  res.send(ncco);
})

// event called when users calls this number
// app.get('/answer', function (req, res) {
// const ncco = [
// {
//   action: 'talk',
//   text: 'Give me some noise!'
// },
// {
//   action: "record",
//   eventUrl: ["http://24773dcf.ngrok.io/voicemail"],
//   endOnSilence: "3",
//   endOnKey: "#",
//   beepStart: "true"
// },
// {
//   action: "talk",
//   text: "Thanks!"
// }
// ]
// res.send(ncco);
// });

// saves the user's voice input fron Nexmo servers
app.post('/voicemail', function (req, res) {
  var recording_url = req.body.recording_url;
  var recording_audio = recording_url.split('/').pop() + '.mp3';
  nexmo.files.save(recording_url, recording_audio, (err, response) => {
    if (response){console.log("Audio downloaded");}
  });
  res.status(204).end();
});

// generic event handlers
app.post('/event', function (req, res) {
  res.status(204).end();
});
