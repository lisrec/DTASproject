var express = require('express');
var router = express.Router();

var conf 	= require('../config');

var mongojs = require('mongojs');
var db = mongojs(conf.connectionString, ['users']);


//Try to logIn:
router.post('/login', function(req, res, next) {
	
	console.log(req.body);

	let username = req.body.login || "";
	let password = req.body.pass || "";

	db.users.find({"login": username}, function(err, usr){
		if(err){
			res.send(err);
		} else {
			usr = usr[0];
			if(typeof(usr) !== 'undefined' && password === usr.pass) {
				console.log("Authorized user:");
				console.log(usr);

				let token = req.jwt.sign(usr, conf.secret, {
		        	expiresIn : 60*15 //15 min
		        });

		        res.json({
					success: true,
					token: token
		        });
			} else {
				res.json({ success: false });
			}
		}
	});

});

router.post('/check', function(req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		req.jwt.verify(token, conf.secret, function(err, decoded) {      
			if (err) {
				res.json({ success: false });    
			} else {
				res.json({ success: true });
			}
		});
	} else {
		res.json({ success: false });
	}

});

module.exports = router;