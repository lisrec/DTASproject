var express = require('express');
var router = express.Router();

var conf = require('../config.js');

var mongojs = require('mongojs');
var db = mongojs(conf.connectionString, ['reviews']);


//Get all reviews
router.get('/reviews', function(req, res, next){
	db.reviews.find(function(err, reviews){
		if(err){
			res.send(err);
		} else {
			res.json(reviews);
		}
	});
});


//Get one review
router.get('/review/:id', function(req, res, next){
	let id = req.params.id;

	if(id.length != 12 && id.length != 24){
		res.json({
			"fail": "badArgs"
		});
	} else {
		db.reviews.findOne({_id: mongojs.ObjectId(id)}, function(err, review){
			if(err){
				res.send(err);
			} else {
				res.json(review);
			}
		});
	}
});


//Get reviews for book_id
router.get('/reviews/book/:id', function(req, res, next){
	let id = req.params.id;

	if(id.length != 12 && id.length != 24){
		res.json({
			"fail": "badArgs"
		});
	} else {
		db.reviews.find({"bookId": id}, function(err, review){
			if(err){
				res.send(err);
			} else {
				res.json(review);
			}
		});
	}
});


//Get reviews for author_id
router.get('/reviews/author/:id', function(req, res, next){
	let id = req.params.id;

	if(id.length != 12 && id.length != 24){
		res.json({
			"fail": "badArgs"
		});
	} else {
		db.reviews.find({authorId: mongojs.ObjectId(id)}, function(err, review){
			if(err){
				res.send(err);
			} else {
				res.json(review);
			}
		});
	}
});


//Add review (review)
router.post('/review', function(req, res, next){
	let newReview = {
		author: "",
		authorId: "",
		bookId: "",
		content: "",
		rate: -1,
		date: ""
	}

	newReview.author = req.body.author;
	newReview.authorId = req.body.authorId;
	newReview.bookId = req.body.bookId;
	newReview.content = req.body.content;
	newReview.rate = req.body.rate;
	newReview.date = new Date();

	console.log(newReview);

	if( 
		(newReview.authorId != "") && (newReview.authorId) && 
		(newReview.bookId != "") && (newReview.bookId) && 
		(newReview.author != "") && (newReview.author) && 
		(newReview.content != "") && (newReview.content) &&
		(newReview.rate > -1) && (newReview.rate)
	  ){
		db.reviews.insert(newReview, function(err, review){
			if(err){
				res.send(err);
			} else {
				res.json(review);
			}
		});
	} else {
		res.json({
			"fail": "badArgs"
		});
	}

});

//Delete review (id)
router.delete('/review/:id', function(req, res, next){
	let id = req.params.id;

	db.reviews.remove({_id: mongojs.ObjectId(id)}, 'justOne', function(err, review){
		if(err){
			res.send(err);
		} else {
			res.json(review);
		}
	});
});

module.exports = router;





