var debateHandler = require('../models/debateModel');


module.exports.createDebate = function(req, res){
	
	var debateCreate = debateHandler.getDebateModel();
	
	var newDebate = new debateCreate(req.body);
	
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

	//console.log(collectionName);

	var comment = debateHandler.getCommentModel(collectionName);

	var newComment = new comment(req.body);

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


module.exports.vote = function(req, res){

	var id = req.body.id;

	var voteIt = debateHandler.getDebateModel();

	var newVote = new voteIt(req.body);

	console.log(req.body.yes);

	newVote.find({'_id':id} , function(err, result) {
		if(err){
			res.json('failed');
		}
		else{
			result.modified = new Date();

			result.save(function(err) {
		      if (err)
		        console.log('error')
		      else
		        console.log('success')
		    });
		}
	});

}