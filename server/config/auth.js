module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '526934463111-bdoourfncmqm11bi5s4mleqp65b4j909.apps.googleusercontent.com',
        'clientSecret'  : 'YlfZl0UgPyGwF92Em5b5HQDN',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};