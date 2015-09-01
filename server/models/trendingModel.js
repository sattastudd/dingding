var mongoose 		= require('mongoose');

var trendingModel = mongoose.model('debateList',{
	name: String, yes: String, no: String
}) ;


var  getTrendingModel = function(){
	return trendingModel;
}

exports.getTrendingModel 		= getTrendingModel;