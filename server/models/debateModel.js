var mongoose 		= require('mongoose');


var debateSchema = new mongoose.Schema({
	question	: String,
	yes			: Number,
	no			: Number,
	createdBy	: String,
	debate 		: String,
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

	var commentModel = mongoose.model(collectionName, commentSchema, collectionName);
	return commentModel; 
}

exports.getCommentModel = getCommentModel;







