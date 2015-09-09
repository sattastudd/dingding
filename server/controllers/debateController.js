var debateHandler = require('../models/debateModel');


module.exports.createDebate = function(req, res){
	
	var debateCreate = debateHandler.getDebateModel();

	var debateInfo = {
		question	: req.body.question,
		yes			: req.body.yes,
		no			: req.body.no,
		debate 		: req.body.debate,
		createdOn	: new Date()
	}
	
	var newDebate = new debateCreate(debateInfo);
	
	newDebate.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
	
};


module.exports.getDebate = function(req, res){
	
	var debate = debateHandler.getDebateModel(req.params);

	var id = req.params.id;
	
	debate.find({'_id' : id}, function (err, doc) {
        res.json(doc);
	});
};



module.exports.debateComment = function(req, res){

	var collectionName = req.body.id;

	var debate = debateHandler.getDebateModel(req.params);

	debate.find({'_id' : collectionName}, function (err, doc) {

        if(doc.length !== 0){
        	var comment = debateHandler.getCommentModel(collectionName);

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

	var debate = debateHandler.getDebateModel(req.params);

	debate.find({'_id' : collectionName}, function (err, doc) {

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
						res.json(value);
						console.log('inserted 1st comment');
					})
				};
				if (result.length !== 0) {
					res.json(result);
				};
			});
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
				   { "_id": id },
				   { "$inc": { "yes": 1 } },
				   function(err, result) {
					   res.json(result);
				   }
				);
	};
	
	if(req.body.value === 'N'){
		vote.update(
				   { "_id": id },
				   { "$inc": { "no": 1 } },
				   function(err, result) {
						res.json(result);
				   }
				);
	};
};