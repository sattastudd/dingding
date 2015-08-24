var roastCreate = require('../models/roastCreateModel');

module.exports.create = function(req, res){
	console.log(req.body);

	var roastNew = new roastCreate(req.body);
	roastNew.save(function(err, result){
		if (!err) {
			res.json("success");
		};
	});
}