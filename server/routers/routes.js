/*var roastController     = require('../controllers/roastController');
var debateController    = require('../controllers/debateController');
var trendingController  = require('../controllers/trendingController');
var express                 = require('express');
var router = module.exports = express();


module.exports = function(router, passport) {

    
router.post('/createRoast', roastController.createRoast);

router.post('/createDebate', debateController.createDebate);

router.get('/trendingDebates', trendingController.getDebates);

router.get('/debateTitle/:id', debateController.getDebate);

router.get('/roastTitle/:id', roastController.getRoast);

router.post('/debateComment', debateController.debateComment);

router.post('/roastComment', roastController.roastComment);

router.get('/roastComments/:id', roastController.roastComments);

router.get('/debateComments/:id', debateController.debateComments);

router.post('/vote', debateController.vote);

router.get('/allDebates', debateController.getDebates);

router.get('/allRoasts', roastController.getRoasts);

router.post('/newRcomments', roastController.getNewRcomments);

router.post('/newQcomments', debateController.getNewQcomments);

};*/





/*



    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/QandAlist', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/QandAlist',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}*/