var roastHandler = require('../models/roastModel');

module.exports.createRoast = function(req, res){

	var Roast = roastHandler.getRoastModel();
	
	var newRoast = new Roast(req.body);

	console.log(req.body);

	newRoast.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
};


module.exports.getRoasts = function(req, res){
	
	var roasts = roastHandler.getRoastModel();
	
	roasts.find({}, function (err, doc) {
        res.json(doc);
	});
};


module.exports.getRoast = function(req, res){
	
	var roast = roastHandler.getRoastModel(req.params);

	var id = req.params.id;
	
	roast.find({'_id' : id}, function (err, doc) {
        res.json(doc);
	});
};

module.exports.getRoasts = function(req, res){
	
	var roasts = roastHandler.getRoastModel();
	
	roasts.find({}, function (err, doc) {
        res.json(doc);
        console.log('value above doc');
        console.log(doc);
	});
};


module.exports.roastComment = function(req, res){

	var collectionName = req.body.id;

	//console.log(collectionName);

	var comment = roastHandler.getCommentModel(collectionName);

	var newComment = new comment(req.body);

	newComment.save(function(err, result){
		if (!err) {
			res.json(result);
		}
	})

};


module.exports.roastComments = function(req, res){

	var collectionName = req.params.id;

	var comments = roastHandler.getCommentModel(collectionName);

	comments.find({}, function (err, result) {
        res.json(result);
        console.log(result);
	});

};