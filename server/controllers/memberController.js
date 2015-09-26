var memberList 		= require('../models/memberModel');

var http 	 		= require('http');


module.exports.createMember = function(req, res){

	var query = req.user;

	if ( typeof query !== 'undefined' && query ) {

			var googleUser = req.user.google.id;

			var facebookUser = req.user.facebook.id;

			var member = memberList.getMemberModel();

			console.log('req.user');

			if( typeof googleUser !== 'undefined' && googleUser ){
				var memberInfo = {
							name			: req.user.google.name,
							email 			: req.user.google.email,
							id				: req.user.google.id,
							imgUrlLg		: req.body.imgUrlBig,
							imgUrlXs		: req.body.imgUrlSm
						}

				var newMember = new member(memberInfo);
					        
				newMember.save(function(err, result){
						res.json('success');
				});
			}else if (typeof facebookUser !== 'undefined' && facebookUser) {
				var memberInfo = {
							name			: req.user.facebook.name,
							email 			: req.user.facebook.email,
							id				: req.user.facebook.id,
							imgUrlLg		: req.body.imgUrlBig,
							imgUrlXs		: req.body.imgUrlSm
						}

				var newMember = new member(memberInfo);
					        
				newMember.save(function(err, result){
						res.json('success');
				});
			};

	}else{
		res.json('NotLoggedIn');
	}

};

module.exports.getMemberData = function(req, res){

	var query = req.user;

	if ( typeof query !== 'undefined' && query ) {

			var googleUser = req.user.google.id;

			var facebookUser = req.user.facebook.id;

			var member = memberList.getMemberModel();

			console.log('req.user');

			if( typeof googleUser !== 'undefined' && googleUser ){
				member.find({'email': req.user.google.email}, function (err, result) {
						res.json(result);
				});
			}else if (typeof facebookUser !== 'undefined' && facebookUser) {
				member.find({'email': req.user.facebook.email}, function (err, result) {
						res.json(result);
				});
			};

	}else{
		res.json('NotLoggedIn');
	}

}

module.exports.memberInit = function(req, res){
	res.json(req.user);
}

module.exports.notifRead = function(req, res){

	var query = req.user;

	if ( typeof query !== 'undefined' && query ) {

			var member = memberList.getMemberModel();

			member.update({'notifications._id': req.body._id},{'$set': {'notifications.$.read': 'true'}}, function (err, result) {
					res.json(result);
			});

	}else{
		res.json('NotLoggedIn');
	}

};


module.exports.allMemData = function(req, res){

	var member = memberList.getMemberModel();

	member.find({}, function(err, result){
		res.json(result);
	})

}