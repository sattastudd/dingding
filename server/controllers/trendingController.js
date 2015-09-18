var trending 		= require('../models/debateModel');

var trendingRoast 	= require('../models/roastModel');

var http 	 		= require('http');


module.exports.getDebates = function(req, res){
	
	var trends = trending.getDebateModel();
	
	trends.find({}, function (err, result) {
        res.json(result);
        //console.log(result);
	});
};

module.exports.getRoasts = function(req, res){

	/*http.get('http://picasaweb.google.com/data/entry/api/user/113370979064211585630?alt=json', function(resp){
	  
	    console.log(resp);
	  
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});*/
	
	var trends = trendingRoast.getRoastModel();
	
	trends.find({}, function (err, result) {
        res.json(result);
        //console.log(result);
	});
};




























/*module.exports.getTrending = function  (req, res) {
	

	var trends = trending.getTrendingModel();
	
	//var collectionName = req.body.name;
	console.log('inside trending controller');

	trends.find({}, function (err, result) {
        res.json(result);
        console.log(result);
	});

};

module.exports.createDebate = function(req, res){

	var trends = trending.getTrendingModel();

	var newDebate = new trends(req.body);

	getTheName = req.body.name;

	newDebate.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
};

module.exports.vote = function(req, res){

	var trends = trending.getTrendingModel();

	var vote = new trends(req.body);

	vote.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
};*/