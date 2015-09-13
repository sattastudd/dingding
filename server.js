console.log("Preparing the Barbeque");

var express 				= require('express'),
		app 				= express(),
		bodyParser			= require('body-parser'),
		mongoose			= require('mongoose'),
		fs 					= require('fs'),
		path	    		= require('path'),
		passport			= require('passport'),
		flash    			= require('connect-flash'),
		session      		= require('express-session'),
		cookieParser 		= require('cookie-parser'),
		http 				= require('http').Server(app),
		roastController 	= require('./server/controllers/roastController'),
		debateController	= require('./server/controllers/debateController'),
		trendingController 	= require('./server/controllers/trendingController');

mongoose.connect('mongodb://localhost:27017/roastDB');

app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./server/config/passport')(passport);

app.engine('html', require('ejs').renderFile); //TODO npm install ejs
app.set('view engine', 'html');

app.use('/', express.static(__dirname + '/client'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/roast/:id', function(req, res){
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
app.get('/QandAlist', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/replies', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/404', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/#/',
                    failureRedirect : '/'
            }));


app.use(bodyParser());

//this is for posting data
app.post('/createRoast', roastController.createRoast);

app.post('/createDebate', debateController.createDebate);

app.get('/trendingDebates', trendingController.getDebates);

app.get('/trendingRoasts', trendingController.getRoasts);

app.get('/debateTitle/:id', debateController.getDebate);

app.get('/roastTitle/:id', roastController.getRoast);

app.post('/debateComment', debateController.debateComment);

app.post('/roastComment', roastController.roastComment);

app.get('/roastComments/:id', roastController.roastComments);

app.get('/debateComments/:id', debateController.debateComments);

app.post('/vote', debateController.vote);

app.get('/allDebates', debateController.getDebates);

app.get('/allRoasts', roastController.getRoasts);

app.post('/newRcomments', roastController.getNewRcomments);

app.post('/newQcomments', debateController.getNewQcomments);

app.post('/debateReply', debateController.debateReplies);

app.post('/upload', function(req, res) {
    var image =  req.files.image;
    var newImageLocation = path.join(__dirname, 'public/images', image.name);
    
    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            res.json(200, { 
                src: 'images/' + image.name,
                size: image.size
            });
        });
    });
});


app.listen(3000, function(){
	console.log("Ready to Roast");
})

