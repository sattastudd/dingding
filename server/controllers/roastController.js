var roastCreate = require('../models/roastModel');

module.exports.create = function(req, res){
	console.log(req.body);

	var roastNew = new roastCreate(req.body);
	
	var collectionName = req.body.name;
	console.log(collectionName);

	roastNew.save(function(err, result){
		if (!err) {
			res.json("success");
		};
	});
}