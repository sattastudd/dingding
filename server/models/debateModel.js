var mongoose 		= require('mongoose');


var debateSchema = new mongoose.Schema({
	question	: String,
	yes			: String,
	no			: String,
	createdBy	: String,
	createdOn	: Date
});

var debateModel = mongoose.model('debates', debateSchema);

var getDebateModel = function(){
	return debateModel;
};

exports.getDebateModel 	= getDebateModel;



// for comment in denbates

var commentSchema = new mongoose.Schema({
	name		: String,
	comment 	: String,
	createdOn	: Date
});

var getCommentModel = function(collectionName){

	var commentModel = mongoose.model(collectionName, commentSchema);
	return commentModel; 
}

exports.getCommentModel = getCommentModel;







