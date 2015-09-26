module.exports = {

    'facebookAuth' : {
        'clientID'      : 'enter id', // your App ID
        'clientSecret'  : 'enter secret', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'enter id',
        'clientSecret'  : 'enter Secret',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};