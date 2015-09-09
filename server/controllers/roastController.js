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
	});
};


module.exports.roastComment = function(req, res){

	var collectionName = req.body.id;

	var roast = roastHandler.getRoastModel(req.params);
	
	roast.find({'_id' : collectionName}, function (err, doc) {
        
        if(doc.length !== 0 ){

			var comment = roastHandler.getCommentModel(collectionName);

			var commentInfo = {
				name		: req.body.name,
				comment		: req.body.comment,
				imgUrl		: '../images/user.jpg',
				createdOn	: new Date()
			}

			var newComment = new comment(commentInfo);

			newComment.save( commentInfo, function(err, result){
				if (!err) {
					res.json(result);
				}
			});
		}else{
			res.json('failure');
		}
	});

};


module.exports.roastComments = function(req, res){


	var roast = roastHandler.getRoastModel(req.params);

	var id = req.params.id;
	
	roast.find({'_id' : id}, function (err, doc) {
        
        if(doc.length !== 0 ){

        	var collectionName = req.params.id;

			var comments = roastHandler.getCommentModel(collectionName);

			comments.find({}, function (err, result) {

		        if (result.length === 0) {
			        var firstComment = {
						name		: 'IndiaRoasts@offcial',
						comment 	: 'We recommend a clean Roast. Naah Fuck it, make it dirty.',
						imgUrl		: '../images/logo.jpg',
						createdOn	: new Date()
					}

					var firstCommentCreate = roastHandler.getCommentModel(collectionName);

					var first = new firstCommentCreate(firstComment);

					first.save(function(err, value){
						res.json(value);
					})
				};
				if (result.length !== 0) {
					res.json(result);
				};
			});
		};
	});

};


module.exports.getNewRcomments = function(req, res){

	var collectionName = req.body.id;

	var newComments = roastHandler.getCommentModel(collectionName);

	newComments.find({createdOn: { $gt: req.body.oldDate }}, function (err, result){
		res.json(result);
	});
}