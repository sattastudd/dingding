console.log("Preparing the Barbeque");

var express 				= require('express'),
		app 				= express(),
		bodyParser			= require('body-parser'),
		mongoose			= require('mongoose'),
		fs 					= require('fs'),
		http 				= require('http').Server(app),
		roastController 	= require('./server/controllers/roastController');
		debateController	= require('./server/controllers/debateController');
		trendingController 	= require('./server/controllers/trendingController');

mongoose.connect('mongodb://localhost:27017/roastDB');

app.engine('html', require('ejs').renderFile); //TODO npm install ejs
app.set('view engine', 'html');

app.use('/', express.static(__dirname + '/client'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/roast', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/create', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/roastList', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/QandA/:id', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/404', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});


app.use(bodyParser());

//this is for posting data
app.post('/createRoast', roastController.createRoast);

app.post('/createDebate', debateController.createDebate);

app.get('/trendingDebates', trendingController.getDebates);

app.get('/debateTitle/:id', debateController.getDebate);

app.post('/debateComment', debateController.debateComment);

app.get('/debateComments/:id', debateController.debateComments);

app.post('/vote', debateController.vote);

//app.get('/getDebate', debateController.getDebate);


app.listen(3000, function(){
	console.log("Ready to Roast");
})

