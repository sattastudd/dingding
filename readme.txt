// debate

app.get('/createDebate', debateController.create);
app.get('/getDebateTitle', debateController.getTitle);
app.get('/getComments', debateController.getComments)
app.post('/postComment', debateController.comment);


// debateController
var debateHandler = require('/models/debateModel');

module.exports.create = function(req, res){
	
	var debateCreate = debateHandler.getDebateModel();
	
	var newDebate = new debateCreate(req.body);
	
	newDebate.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
	
};


module.exports.getTitle = function(req, res){
	
	var trends = debateHandler.getDebateModel();
	
	trends.find({}, function (err, result) {
        res.json(result);
        console.log(result);
	});
};


module.exports.getComments = function(req, res){
	
	var comments = debateHandler.
	
	comments.find({}, function (err, result) {
		res.json(result);
		console.log(result);
	});
};


module.exports.comment = function(req, res){
	
	var comment = debateHandler.
	
	var newComment = new comment(req.body);
	
	newComment.save(function(err, result){
		if (!err) {
			res.json(result);
		};
	});
};





// debateModel
var mongoose 	= require('mongoose');

var debateSchema = new mongoose.Schema({
	question	: String,
	yes			: String,
	no			: String,
	createdBy	: String,
	createdOn	: Date
});

var debateModel = mongoose.model('trendingDebate', debateSchema);

var getDebateModel = function(){
	return debateModel;
};


var commentSchema = new mongoose.Schema({
	name		:	String,
	comment		:	String,
	profilePic	:	String,
	createdOn	: 	Date
});

var commentModel = mongoose.model('newDebateCollection', commentSchema);




// get Trending

app.get('/getTrendingDebate', trendingController.getDebateTrends);

// trendingController
var trendingDebateHandler = require('/models/debateModel');

module.exports.getDebateTrends = function(req, res){
	
	var trends = trendingHandler.getDebateModel();
	
	trends.find({}, function (err, result) {
        res.json(result);
        console.log(result);
	});
};





















module.exports.debateComment = function(req, res){

	var Debate = debateCreate.getDebateModel();

	//var debateList = debateCreate.getDebateListModel();
	
	var newDebate = new Debate(req.body);

	console.log(req.body);
	var Debate = debateCreate.getDebateModel(req.body.debateId);
	Debate.save(function(err, result){
		if (!err) {
			res.json(result);
			var debateCreatedId = result._id;
			console.log(debateCreatedId);
		};
	});

	/*var newDebateList = new debateList(req.body, debateCreatedId);
	newDebateList.save(function(err, result){
		if (!err) {
			res.json('value stored in list');
		};
	});*/

};







var mongoose 		= require('mongoose');


//console.log(req.body);

var debateModel = mongoose.model('debate',{
name: String, date: String, comment: String
}) ; 

/*var debateVoteModel = mongoose.model('debateList',{
name: String, id: String
}) ;*/ 


var  getDebateModel = function(debateId){
	return mongoose.model( debateId, {name: String, date: String, comment: String})
};

/*var  getDebateVotetModel = function(){
	return debateListModel;
}*/

exports.getDebateModel 		= getDebateModel;
//exports.getDebateListModel 	= getDebateListModel;


