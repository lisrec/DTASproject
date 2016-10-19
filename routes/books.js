var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://book_app:skibaXD@ds061076.mlab.com:61076/tas_project', ['books']);


//Get all books
router.get('/books', function(req, res, next){
	db.books.find(function(err, books){
		if(err){
			res.send(err);
		} else {
			res.json(books);
		}
	});
});


//Get one book
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
router.post('/book', function(req, res, next){
	let newBook = {
		"name": "",
    	"author": "",
    	"year": 0,
    	"desc": ""
	}

	newBook.name = req.body.name;
	newBook.author = req.body.author;
	newBook.year = req.body.year;
	newBook.desc = req.body.desc;

	console.log(newBook);

	if((newBook.name != "") && (newBook.name) && (newBook.author != "") && (newBook.author) && (newBook.year > 0) && (newBook.year)){
		db.books.insert(newBook, function(err, book){
			if(err){
				res.send(err);
			} else {
				res.json(book);
			}
		});
	} else {
		res.json({
			"fail": "badArgs"
		});
	}

});

//Update book (Book)
router.put('/book/:id', function(req, res, next){
	let id = req.params.id;
	let updBook = {
		"name": "",
    	"author": "",
    	"year": 0,
    	"desc": ""
	}

	updBook.name = req.body.name;
	updBook.author = req.body.author;
	updBook.year = req.body.year;
	updBook.desc = req.body.desc;

	if((newBook.name != "") && (newBook.author != "") && (newBook.year > 0)){
		db.books.update({_id: mongojs.ObjectId(id)}, newBook, {}, function(err, book){
			if(err){
				res.send(err);
			} else {
				res.json(book);
			}
		});
	} else {
		res.json({
			"fail": "badArgs"
		});
	}

});

//Delete book (id)
router.delete('/book/:id', function(req, res, next){
	let id = req.params.id;

	db.books.remove({_id: mongojs.ObjectId(id)}, 'justOne', function(err, book){
		if(err){
			res.send(err);
		} else {
			res.json(book);
		}
	});
});

module.exports = router;








