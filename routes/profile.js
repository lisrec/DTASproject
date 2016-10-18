var express = require('express');
var router = express.Router();

router.get('/profiles', function(req, res, next){
	res.send("Profiles list");
});

module.exports = router;