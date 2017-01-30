var express 	= require("express");
var path 		= require("path");
var bodyParser 	= require("body-parser");
var morgan      = require('morgan');
var jwt			= require('jsonwebtoken');

var config 		= require('./config');

var auth 		= require("./routes/auth");
var index 		= require("./routes/index");
var books 		= require("./routes/books");
var profile 	= require("./routes/profile");
var reviews 	= require("./routes/reviews");
var messages 	= require("./routes/messages");
var rents 		= require("./routes/rents");

var port = 8080;

var app = express();

app.set('superSecret', config.secret);

//Views:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Static Folder:
app.use(express.static(path.join(__dirname, 'client')));

//Parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Inject JWT library:
app.use(function(req,res,next) {
	req.jwt = jwt;
	next();
});

//Debugger:
app.use(morgan('dev'));

app.use('/api/auth', auth);

app.use('/', index); 
app.use('/api', profile);
app.use('/api', books);
app.use('/api', reviews);
app.use('/api', messages);
app.use('/api', rents);

app.use(function(req, res) {
    //res.status(404).end('error');
    res.redirect('/');
});

app.listen(port, function(){
	console.log(`Server started on ${port}`);
});