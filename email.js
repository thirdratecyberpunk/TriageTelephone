'use strict';

const request = require('request');
var http = require('http');
const nodemailer = require('nodemailer');

var doctor = 'myersj@aston.ac.uk';
var path = '/Users/Jenny/Downloads/Jillian_Michaels_30_Day_Shred_Workout_-_[GuruFuel-RIP].zip'
var patient = "0001";

function sendMail(recipient, filePath, patientID){
var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secureConnection: false, // use SSL
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
        user: //username
        pass: //password
    }
});

// setup e-mail data
var mailOptions = {
<<<<<<< HEAD
    from: '"DR DAN" <myersj@aston.ac.uk>', // sender address (who sends)
    to: recipient, // list of receivers (who receives)
=======
    from: '"Our Code World " <myersj@aston.ac.uk>', // sender address (who sends)
    to: 'blackbul@aston.ac.uk', // list of receivers (who receives)
>>>>>>> 4c74643b927b94c42c8b4e2f48c885627131c0cd
    subject: 'Hello', // Subject line
    html: '<b>AUTOMATED - TRIAGE RESULTS PATIENT:' + patientID + '</b><br> Hi, here is your automated email from your patient ' + patientID + ' . Please find attatched the results of the tests.', // html body
    attachments: [{
      path: filePath
    }]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
}

sendMail(doctor, path, patient);
