var mongoose 		= require('mongoose');


var memberSchema = new mongoose.Schema({
	name			: String,
	email 			: String,
	id				: String,
	imgUrlLg		: String,
	imgUrlXs		: String
});

var memberModel = mongoose.model('members', memberSchema);


var  getMemberModel = function(){
	return memberModel;
}

exports.getMemberModel = getMemberModel;