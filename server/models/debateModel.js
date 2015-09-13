var mongoose 		= require('mongoose');


var debateSchema = new mongoose.Schema({
	question	: String,
	yes			: Number,
	no			: Number,
	yBtnValue	: String,
	nBtnValue	: String,
	createdBy	: String,
	debate 		: String,
	slug		: String,
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
	imgUrl		: String,
	createdOn	: Date,
	replies		: String
});

var getCommentModel = function(collectionName){

	var commentModel = mongoose.model(collectionName, commentSchema, collectionName);
	return commentModel; 
}

exports.getCommentModel = getCommentModel;







