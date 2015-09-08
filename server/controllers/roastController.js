var roastHandler = require('../models/roastModel');

module.exports.createRoast = function(req, res){

	var Roast = roastHandler.getRoastModel();

	var roastInfo = {
		name		: req.body.name,
		quote 		: req.body.quote,
		createdOn	: new Date()
	}
	
	var newRoast = new Roast(req.body);

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

	var commentInfo = {
		name		: req.body.name,
		comment		: req.body.comment,
		createdOn	: new Date()
	}

	var newComment = new comment(commentInfo);

	newComment.save( commentInfo, function(err, result){
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


module.exports.getNewRcomments = function(req, res){

	var collectionName = req.body.id;

	var newComments = roastHandler.getCommentModel(collectionName);

	newComments.find({createdOn: { $gt: req.body.oldDate }}, function (err, result){
		res.json(result);
	});
}