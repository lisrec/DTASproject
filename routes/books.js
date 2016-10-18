var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://book_app:skibaXD@ds061076.mlab.com:61076/tas_project', ['books']);

router.get('/books', function(req, res, next){
	db.books.find(function(err, books){
		if(err){
			res.send(err);
		} else {
			res.json(books);
		}
	});
});

router.get('/book/:id', function(req, res, next){
	let id = req.params.id;

	db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, book){
		if(err){
			res.send(err);
		} else {
			res.json(book);
		}
	});
});

//Add book (Book)

//Update book (Book)

//Delete book (id)

module.exports = router;