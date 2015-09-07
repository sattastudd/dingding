var mongoose 		= require('mongoose');


//creating roast

var userSchema = new mongoose.Schema({
	google:{
		id	  : String,
		token : String,
		email : String,
		name  : String
	}
});

var userModel = mongoose.model('users', userSchema);


var  getUserModel = function(){
	return userModel;
}