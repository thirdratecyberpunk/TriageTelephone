'use strict';

const request = require('request');
var http = require('http');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secureConnection: false, // use SSL
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
});

// setup e-mail data
var mailOptions = {
    from: '"Our Code World " <myersj@aston.ac.uk>', // sender address (who sends)
    to: 'blackbul@aston.ac.uk', // list of receivers (who receives)
    subject: 'Hello', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
