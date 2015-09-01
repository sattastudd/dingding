var mongoose 		= require('mongoose'),
	collectionName 	= require('../controllers/roastController')

var roastName = collectionName.createRoast;

//console.log(req.body);

var roastModel = mongoose.model('roast',{
name: String, description: String
}) ;


var  getRoastModel = function(){
	return roastModel;
}

exports.getRoastModel = getRoastModel;