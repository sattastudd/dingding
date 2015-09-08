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
        console.log('value above doc');
        console.log(doc);
	});
};



module.exports.debateComment = function(req, res){

	var collectionName = req.body.id;

	var comment = debateHandler.getCommentModel(collectionName);

	var commentInfo = {
		name		: req.body.name,
		comment 	: req.body.comment,
		createdOn	: new Date()
	}

	var newComment = new comment(commentInfo);

	newComment.save(function(err, result){
		if (!err) {
			res.json(result);
		}
	})

};


module.exports.debateComments = function(req, res){

	var collectionName = req.params.id;

	var comments = debateHandler.getCommentModel(collectionName);

	comments.find({}, function (err, result) {
        res.json(result);
        console.log(result);
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
        console.log(result);
	});
};


module.exports.vote = function(req, res){

	var id = req.body.id;

	var vote = debateHandler.getDebateModel();

	//var newVote = new vote('debates');

	console.log(req.body);

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