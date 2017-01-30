var express = require('express');
var router = express.Router();

var conf = require('../config.js');

var mongojs = require('mongojs');
var db = mongojs(conf.connectionString, ['rents']);


router.get('/rents/:id', function(req, res, next){
	let id = req.params.id;

	if(id.length != 12 && id.length != 24){
		res.json({
			"fail": "badArgs"
		});
	} else {
		db.rents.find({userId: id}, function(err, rents){
			if(err){
				res.json({
					"fail": err
				});
			} else {
				res.json(rents);
			}
		});
	}
});

router.post('/rent', function(req, res, next){
	let newRent = {
		"userId": "",
    	"bookId": "",
	}

	newRent.userId = req.body.userId;
	newRent.bookId = req.body.bookId;

	console.log(newRent);

	if((newRent.userId != "") && (newRent.userId) && (newRent.bookId != "") && (newRent.bookId)) {
		db.rents.insert(newRent, function(err, rent){
			if(err){
				res.json({
					"fail": err
				});
			} else {
				res.json(rent);
			}
		});
	} else {
		res.json({
			"fail": "badArgs"
		});
	}
});

router.delete('/rent/:id', function(req, res, next){
	let id = req.params.id;

	db.rents.remove({_id: mongojs.ObjectId(id)}, 'justOne', function(err, rent){
		if(err){
			res.json({
				"fail": err
			});
		} else {
			res.json(rent);
		}
	});
});

module.exports = router;