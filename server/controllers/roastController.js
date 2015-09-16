var roastHandler = require('../models/roastModel');

module.exports.createRoast = function(req, res){

	var Roast = roastHandler.getRoastModel();

	var slugReal = req.body.name.replace(/[ +,.<>'!@#$]/g, '_').toLowerCase();

	Roast.find({'slug' : slugReal}, function (err, doc) {
		var docLength = doc.length;
        if (doc.length !== 0) {
        	//console.log('its two');
        	var roastInfoDuplicate = {
						name		: req.body.name,
						quote 		: req.body.quote,
						slug		: slugReal + docLength,
						createdOn	: new Date()
					}
			var newRoast = new Roast(roastInfoDuplicate);
			newRoast.save(function(err, result){
				if (!err) {
					res.json(result);
				};
			});
        }else{
        	var roastInfo = {
				name		: req.body.name,
				quote 		: req.body.quote,
				slug		: slugReal,
				createdOn	: new Date()
			}

        	var newRoast = new Roast(roastInfo);
        	//console.log(roastInfo);

			newRoast.save(function(err, result){
				if (!err) {
					res.json(result);
				};
			});
        };
	});
	
};


module.exports.getRoast = function(req, res){
	
	var roast = roastHandler.getRoastModel(req.params);

	var id = req.params.id;
	
	roast.find({'slug' : id}, function (err, doc) {
        res.json(doc);
        //console.log(doc);
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

	var roast = roastHandler.getRoastModel();

	console.log(req.body);
	
	//if(collectionName.length === 24){
		roast.find({'slug' : collectionName}, function (err, doc) {
			console.log(doc);
	        
	        if(doc[0].slug === collectionName ){

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

	var collectionName = req.params.id;


	//if(collectionName.length === 24){
		roast.find({'slug' : collectionName}, function (err, doc) {
			//console.log(doc);
	        
	        if(doc.length !== 0 ){

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

							var arrOfObjs = value;
							var arrOfVals = [];
							
							    arrOfVals.push( arrOfObjs );
							
							res.json(arrOfVals);

						})
					};
					if (result.length !== 0) {
						res.json(result);
					};
				});
			}else{
				res.json('failure');
				//console.log(doc);
			}
		});
	/*}else{
		res.json('failure');
	}*/

};


module.exports.getNewRcomments = function(req, res){

	var collectionName = req.body.id;

	var newComments = roastHandler.getCommentModel(collectionName);

	newComments.find({createdOn: { $gt: req.body.oldDate }}, function (err, result){
		res.json(result);
	});
}