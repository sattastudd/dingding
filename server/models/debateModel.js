var mongoose 		= require('mongoose');


//console.log(req.body);

var debateModel = mongoose.model('debate',{
name: String, date: String, comment: String
}) ; 

/*var debateVoteModel = mongoose.model('debateList',{
name: String, id: String
}) ;*/ 


var  getDebateModel = function(){
	return debateModel;
}

/*var  getDebateVotetModel = function(){
	return debateListModel;
}*/

exports.getDebateModel 		= getDebateModel;
//exports.getDebateListModel 	= getDebateListModel;