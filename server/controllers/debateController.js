var debateCreate = require('../models/debateModel');


module.exports.debateComment = function(req, res){

	var Debate = debateCreate.getDebateModel();

	//var debateList = debateCreate.getDebateListModel();
	
	var newDebate = new Debate(req.body);

	console.log(req.body);

	newDebate.save(function(err, result){
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