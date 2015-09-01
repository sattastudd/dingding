var trending = require('../models/trendingModel');

module.exports.getTrending = function  (req, res) {
	

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
};