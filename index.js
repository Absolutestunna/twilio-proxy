var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
}));

var cfg = {};
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;


var client = require('twilio')(cfg.accountSid, cfg.authToken);
app.post('/sendSMS', function(req, res){

  var user = req.body.data.user;
  var name = req.body.data.name;
  var location = req.body.data.location;
  var details = req.body.data.details;
  var time = req.body.data.time;
  var validNumbers = req.body.data.validNumbers;
  var message = "Hey guys, " + user + " here. I'm organizing a game at " + time + ". The game is at " + name + ". Address is: " + location + ". " + details + ".";
  console.log('message', message);
  console.log('validNumbers', validNumbers);


  // var to = '914-356-9250'; //req.body.to;

  for (var i=0; i<validNumbers.length; i++){
    client.messages.create({
      body: message,
      to: validNumbers[i],
      from: cfg.sendingNumber
    }, function(err, data) {
      if (err) {
        console.error(err);
      }
    });
  }


});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on port 3000');
