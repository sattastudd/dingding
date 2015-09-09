var mongoose 		= require('mongoose');


//creating roast

var roastSchema = new mongoose.Schema({
	name		: String,
	quote 		: String,
	image		: String,
	createdOn	: Date,
	createdBy	: String
});

var roastModel = mongoose.model('roasts', roastSchema);


var  getRoastModel = function(){
	return roastModel;
}

exports.getRoastModel = getRoastModel;


// comments for roast

var commentSchema = new mongoose.Schema({
	name		: String,
	comment 	: String,
	imgUrl		: String,
	createdOn	: Date
});

var getCommentModel = function(collectionName){

	var commentModel = mongoose.model(collectionName, commentSchema, collectionName);
	return commentModel; 
}

exports.getCommentModel = getCommentModel;