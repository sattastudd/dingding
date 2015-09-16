var debateHandler = require('../models/debateModel');

var mongoose = require( 'mongoose' );


module.exports.createDebate = function(req, res){
	
	var debateCreate = debateHandler.getDebateModel();

	var slugReal = null;

	if(req.body.debate === "Y"){
			var slugValue 	=  (req.body.question + '-options-' + req.body.yBtnValue + '-' + req.body.nBtnValue).toLowerCase();
				slugReal 	=  slugValue.replace(/[\s+,.<>'!@#$]/g, '-');
	}else{
		slugReal = req.body.question.replace(/[\s+,.<>'!@#$]/g, '-').toLowerCase();
	}

	var collectionIDSorted = req.body.question.replace(/[\s+,.<>'!@#$]/g, '-').toLowerCase();

	var collectionID = collectionIDSorted.substring(0,112);

	debateCreate.find({'collectionID' : collectionID}, function (err, doc) {

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
				description	: req.body.description,
				collectionID : collectionID,
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

	var collectionLength = req.body.id;

	var collectionName = collectionLength.substring(0, 112);

	var debate = debateHandler.getDebateModel();

	//if(collectionName.length === 24){
		debate.find({'collectionID' : collectionName}, function (err, doc) {

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

	var collectionLength = req.params.id;

	var collectionName = collectionLength.substring(0, 112);

	var debate = debateHandler.getDebateModel();

		debate.find({'collectionID' : collectionName}, function (err, doc) {

			if(doc.length !== 0){

				var comments = debateHandler.getCommentModel(collectionName);

				comments.find({}, function (err, result) {

					console.log(result); 
					console.log('collectionName>>>>'+collectionName);

					if (result.length !== 0) {
						res.json(result);

					}else {
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
							console.log(arrOfVals);
						})
					};
				});
			}else{
				res.json('failure');
			}

		});

};


module.exports.getNewQcomments = function (req, res){

	var collectionLength = req.body.id;

	var collectionName = collectionLength.substring(0, 112);

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


module.exports.editQcomment = function(req, res){

	var collectionLength = req.params.debateID;

	var collectionName = collectionLength.substring(0, 112);

	var commentName = req.body.id;

	var debate = debateHandler.getCommentModel(collectionName);

	debate.update({'_id': commentName},{'comment':req.body.comment}, function(err, result){
						
						res.json(result);
					});
};



module.exports.editQuestion = function(req, res){

	var debateName = req.body.id;

	var debateTitle = debateHandler.getDebateModel();

	console.log(req.body.question);

	debateTitle.update({'_id':debateName},{'question':req.body.question}, function(err, result){
		res.json(result);
		console.log(result);
	})
};



module.exports.debateReplies = function(req, res){

	var combinedID = req.params.debateID;

	if (req.body.id === 'replyPage'){

		var commentID = combinedID.substr(combinedID.length - 24);

		var collectionLength 	= combinedID.length - commentID.length;

		if (collectionLength >= 112) {
			var collectionName 		= combinedID.substring(0,112);
		}else{
			var collectionName 		= combinedID.substring(0,collectionLength);
		}

		var debate = debateHandler.getCommentModel(collectionName);

		debate.update(
						{"_id"		: commentID},
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
	}else{

		var debatePage = debateHandler.getCommentModel(combinedID);

		var commentName = req.body.id;

		debatePage.update(
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
		
	}
};




module.exports.getReplies = function(req, res){

	var combinedID 			= req.params.id;

	var commentID 			= combinedID.substr(combinedID.length - 24);

	var collectionLength 	= combinedID.length - commentID.length;

	if (collectionLength >= 112) {
		var collectionName 		= combinedID.substring(0,112);
	}else{
		var collectionName 		= combinedID.substring(0,collectionLength);
	}
	
	var replies = debateHandler.getCommentModel(collectionName);
	
	replies.find({'_id':commentID}, function (err, result) {
        res.json(result);
        console.log(result);
	});
};