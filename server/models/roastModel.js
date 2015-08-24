var mongoose 		= require('mongoose'),
	collectionName 	= require('../controllers/roastController')

module.exports = mongoose.model('roastCreateModel',{
	name: String
})