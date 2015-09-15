var debateHandler = require('../models/debateModel');

var mongoose = require( 'mongoose' );


module.exports.createDebate = function(req, res){
	
	var debateCreate = debateHandler.getDebateModel();

	var slugReal = null;

	if(req.body.debate === "Y"){
		var slugValue = req.body.question.replace(/ /g, '_');
			slugReal =  (slugValue + '_options_' + req.body.yBtnValue + '_' + req.body.nBtnValue).toLowerCase();
	}else{
		slugReal = req.body.question.replace(/ /g, '_').toLowerCase();
	}

	debateCreate.find({'slug' : slugReal}, function (err, doc) {

        if (doc.length !== 0) {
        	res.json(doc);

        }else{
        	var debateInfo = {
				question	: req.body.question,
				yes			: req.body.yes,
				no			: req.body.no,
				yBtnValue	: req.body.yBtnValue,
				nBtnValue	: req.body.nBtnValue,
				debate 		: req.body.debate,
				slug		: slugReal,
				createdOn	: new Date()
			}

			console.log(debateInfo);

			var newDebate = new debateCreate(debateInfo);
	
			newDebate.save(function(err, result){
				if (!err) {
					res.json(result);
				};
			});
        };
	});
	
};


module.exports.getDebate = function(req, res){
	
	var debate = debateHandler.getDebateModel();

	var id = req.params.id;
	
	debate.find({'slug' : id}, function (err, doc) {
        res.json(doc);
	});
};



module.exports.debateComment = function(req, res){

	var collectionName = req.body.id;

	var debate = debateHandler.getDebateModel();

	//if(collectionName.length === 24){
		debate.find({'slug' : collectionName}, function (err, doc) {

	        if(doc.length !== 0){
	        	var comment = debateHandler.getCommentModel(collectionName);

	        	var sortedComment = req.body.comment.replace(/\r?\n/g, '<br>');
	        	console.log(sortedComment);

				var commentInfo = {
					name		: req.body.name,
					comment 	: req.body.comment,
					imgUrl		: '../images/user.jpg',
					createdOn	: new Date()
				}

				var newComment = new comment(commentInfo);

				newComment.save(function(err, result){
					if (!err) {
						res.json(result);
					}
				})
			}else{
				res.json('failure');
			}
		});

};


module.exports.debateComments = function(req, res){

	var collectionName = req.params.id;

	var debate = debateHandler.getDebateModel();


	//if(collectionName.length === 24){
		debate.find({'slug' : collectionName}, function (err, doc) {

			if(doc.length !== 0){

				var comments = debateHandler.getCommentModel(collectionName);

				comments.find({}, function (err, result) {

				    if (result.length === 0) {
				        var firstComment = {
							name		: 'IndiaRoasts@offcial',
							comment 	: 'Share with your friends to get more and more answers',
							imgUrl		: '../images/logo.jpg',
							createdOn	: new Date()
						}

						var firstCommentCreate = debateHandler.getCommentModel(collectionName);

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

						/*for (var i = result.length - 1; i >= 0; i--) {
							var realComment = result[i].comment.replace(/<br>/g, '\r?\n');
						};*/
					};
				});
			}else{
				res.json('failure');
			}

		});

};


module.exports.getNewQcomments = function (req, res){

	var collectionName = req.body.id;

	var newComments = debateHandler.getCommentModel(collectionName);

	newComments.find({createdOn: { $gt: req.body.oldDate }}, function (err, result){
		res.json(result);
	});
}



module.exports.getDebates = function(req, res){
	
	var debates = debateHandler.getDebateModel();
	
	debates.find({}, function (err, result) {
        res.json(result);
	});
};


module.exports.vote = function(req, res){

	var id = req.body.id;

	var vote = debateHandler.getDebateModel();

	if(req.body.value === 'Y'){
		vote.update(
				   { "slug": id },
				   { "$inc": { "yes": 1 } },
				   function(err, result) {
					   res.json(result);
				   }
				);
	};
	
	if(req.body.value === 'N'){
		vote.update(
				   { "slug": id },
				   { "$inc": { "no": 1 } },
				   function(err, result) {
						res.json(result);
				   }
				);
	};
};


module.exports.debateReplies = function(req, res){

	var collectionName = req.params.debateID;

	var commentName = req.body.id;

	var debate = debateHandler.getCommentModel(collectionName);

	debate.update(
					{"_id"		: commentName},
					{ "$push":	{"replies": {	
										name 		: req.body.name,
										comment 	: req.body.comment,
										imgUrl		: '../images/user.jpg',
										createdOn	: new Date()
									}
								}
					},
					function(err, result) {
						res.json(result);
						console.log(result);
				   }
	);
};


module.exports.editQcomment = function(req, res){

	var collectionName = req.params.debateID;

	var commentName = req.body.id;

	var debate = debateHandler.getCommentModel(collectionName);

	debate.update({'_id': commentName},{'comment':req.body.comment}, function(err, result){
						
						res.json(result);
					});
};



module.exports.editQuestion = function(req, res){

	var collectionName = req.params.debateID;

	var debateName = req.body.id;

	var debateTitle = debateHandler.getDebateModel();

	console.log(req.body.question);

	debateTitle.update({'_id':debateName},{'question':req.body.question}, function(err, result){
		res.json(result);
		console.log(result);
	})


	//var debate = debateHandler.getCommentModel(collectionName);

	/*debate.update({'_id': commentName},{'comment':req.body.comment}, function(err, result){
						
						res.json(result);
						console.log(result);
					});*/
};
