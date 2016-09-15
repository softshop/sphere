var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var sendgrid  = require('sendgrid')('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');
var validator = require('validator');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use('/', router);

router.get('/', function(req, res){
	res.render('index');
})

router.post('/sendMail', function(req, res){
	var emailTo = "krishna@sphereadvisory.com";
	var name = req.body.name;
	var emailFrom = req.body.emailFrom;
	var phoneNumber = req.body.phoneNumber;
	var message = req.body.message;
	var subject = 'Inquiry Through SphereAdvisory.com';

	var messageString = "Name: " + name + '\n\n' + "Email: " + emailFrom + "\n\n" + "Phone Number: " + phoneNumber + "\n\n" + "Message: " + message;

	console.log("--------------------------------");
	console.log("Received Email Post...");
	console.log("Name: " + name);
	console.log("From: " + emailFrom);
	console.log("Phone Number: " + phoneNumber);
	console.log("Message: " + message);

	var validName = (name != null);
	var validEmail = validator.isEmail(emailFrom);
	var validNumber = true;
	if (phoneNumber != ""){
		validNumber = validator.isNumeric(phoneNumber) && validator.isLength(phoneNumber, {min:10, max: 15});
	}
	var validMessage = (message != null);

	if (!validName){
		console.log("Invalid Name, sending error");
		res.send({status: 400, error: "NAME"});
	}
	if (!validEmail){
		console.log("Invalid Email, sending error");
		res.send({status: 400, error: "EMAIL"});
		return null;
	}
	if (!validNumber) {
		console.log("Invalid Number, sending error");
		res.send({status: 400, error: "PHONE_NUMBER"});
		return null;
	}
	if (!validMessage) {
		console.log("Invalid Message, sending error");
		res.send({status: 400, error: "MESSAGE"});
		return null;
	}
	console.log("Sending Email...");
	sendgrid.send({
		to: emailTo,
		from: emailFrom,
		subject: subject,
		text: messageString
	}, function(err, json){
		if (err){
			console.log("Error: " + err);
			res.send({status:400, error: err});
			return null;
		}
		console.log("Success!")
		res.send({status: 200, error: "NONE"});
	})
})

http.listen(port, function(){
	console.log("listening on port: " + port);
});