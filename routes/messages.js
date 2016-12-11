var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://book_app:skibaXD@ds061076.mlab.com:61076/tas_project', ['messages']);


router.post('/message', function(req, res, next){
	console.log(req.body);
	let newMessage = {
		"usermail": "",
    	"title": "",
    	"message": ""    	
	}

	newMessage.usermail = req.body.usermail;
	newMessage.title = req.body.title;
	newMessage.message = req.body.message;
	
	console.log(newMessage);

	if((newMessage.usermail != "") && (newMessage.usermail) && (newMessage.title != "") && (newMessage.title) && (newMessage.message != "") && (newMessage.message)){
		db.messages.insert(newMessage, function(err, message){
			if(err){
				res.send(err);
			} else {
				res.json(message);
			}
		});
	} else {
		res.json({
			"fail": "badArgs"
		});
	}

});

module.exports = router;