var roastCreate = require('../models/roastModel');

module.exports.createRoast = function(req, res){

	var Roast = roastCreate.getRoastModel();
	
	var newRoast = new Roast(req.body);

	console.log(req.body);

	newRoast.save(function(err, result){
		if (!err) {
			res.json("success");
		};
	});
};
