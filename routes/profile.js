var express = require('express');
var router = express.Router();

var conf = require('../config.js');

var mongojs = require('mongojs');
var db = mongojs(conf.connectionString, ['users']);

function checkUserExist(login, next) {
	db.users.find({"login": login}, function(err, usr){
		if(err){
			return false;
		} else {
			usr = usr[0];
			if(typeof(usr) !== 'undefined') {
				return true;
			} else {
				return false;
			}
		}
	});
}

router.post('/register', function(req, res, next){
	let newProfile = {
		"login": "",
    	"pass": "",
    	"admin": false
	}

	newProfile.login = req.body.login;
	newProfile.pass = req.body.pass;

	console.log(newProfile);

	if((newProfile.login != "") && (newProfile.login) && (newProfile.login.length >= 3) && (newProfile.pass != "") && (newProfile.pass)) {

		db.users.find({"login": newProfile.login}, function(err, usr){
			if(err){
				db.users.insert(newProfile, function(err, newUsr){
					if(err){
						res.send(err);
					} else {
						res.json(newUsr);
					}
				});
			} else {
				usr = usr[0];
				if(typeof(usr) !== 'undefined') {
					res.json({
						"fail": "userExist"
					});
				} else {
					db.users.insert(newProfile, function(err, newUsr){
						if(err){
							res.send(err);
						} else {
							res.json(newUsr);
						}
					});
				}
			}
		});

	} else {
		res.json({
			"fail": "badArgs"
		});
	}
});

module.exports = router;