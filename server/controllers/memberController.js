var memberList 		= require('../models/memberModel');

var http 	 		= require('http');


module.exports.createMember = function(req, res){

	console.log(req.user);

	var query = req.user;

	if ( typeof query !== 'undefined' && query ) {
		
		var member = memberList.getMemberModel();
		
		member.find({'email': req.user.google.email}, function (err, result) {

			console.log('result');
			console.log(result);
	        
	        if (result.length === 0){

	        	var userDataUrl = 'http://picasaweb.google.com/data/entry/api/user/' + req.user.google.id + '?alt=json';

	        	http.get(userDataUrl, function(res){
		  
				    

		            var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var jsonData = JSON.parse(body);
				        var imageUrl = jsonData.entry.gphoto$thumbnail.$t;
				        var imageUrlBig = imageUrl.replace('64-c', '100-c');
				        var imageUrlSmall = imageUrl.replace('64-c', '40-c');
				        console.log(imageUrlBig);

				       	var memberInfo = {
							name			: req.user.google.name,
							email 			: req.user.google.email,
							id				: req.user.google.id,
							imgUrlLg		: imageUrlBig,
							imgUrlXs		: imageUrlSmall
						}

						var newMember = new member(memberInfo);
			        	//console.log(roastInfo);
						newMember.save(function(err, result){

						});

				    });
				  
				}).on("error", function(e){
				  console.log("Got error: " + e.message);
				});
			};
		});

	}else{

		res.json('NotLoggedIn');

	};
};

module.exports.getMemberData = function(req, res){

	var query = req.user;

	if ( typeof query !== 'undefined' && query ) {

			var member = memberList.getMemberModel();

			member.find({'email': req.user.google.email}, function (err, result) {
					res.json(result);
			});

	}else{
		res.json('NotLoggedIn');
	}

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

}