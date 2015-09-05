var app = angular.module('roast',['ngRoute']);


app.config(function($routeProvider,$locationProvider) {
        $routeProvider

            // route for the home page
            .when('/roast/:id', {
                templateUrl : '../views/roastPage.html',
                controller  : 'roastPageController'
            })
            
            .when('/', {
                templateUrl : '../views/roastTrending.html',
                controller  : 'roastTrendingController'
            })
            .when('/create', {
                templateUrl : '../views/roastCreate.html',
                controller  : 'roastCreateController'
            })
            .when('/roastList', {
                templateUrl : '../views/roastList.html',
                controller  : 'roastListController'
            })
            .when('/QandA/:id', {
                templateUrl : '../views/QandApage.html',
                controller  : 'QandApageController'
            })
            .when('/QandAlist', {
                templateUrl : '../views/QandAlist.html',
                controller  : 'QandAlistController'
            })
            .when('/404', {
                templateUrl : 'views/404.html',
                controller  : 'errorController'
            })
            .otherwise({redirectTo:'/404'});
            
            $locationProvider.html5Mode(true);

        });


app.controller('roastIndexController', function($scope,$http,$location){

            $scope.goToCreate = function(){
                $location.path('/create');
                window.scrollTo(0,0);
                $scope.showToolBox();
            };
            $scope.goToTrending = function(){
                $location.path('/');
                window.scrollTo(0,0);
                $scope.showToolBox();
            };
            $scope.goToHome = function(){
                $location.path('/home');
                window.scrollTo(0,0);
                $scope.showToolBox();
            }
            $scope.goToRoasts = function(){
                $location.path('/roastList');
                window.scrollTo(0,0);
                $scope.showToolBox();
            }
            $scope.goToQnAPage = function(){
                $location.path('/QandAlist');
                window.scrollTo(0,0);
                $scope.showToolBox();
            }

            $scope.toolBoxActive = true;
            $scope.showToolBox = function () {
                $scope.toolBoxActive = !$scope.toolBoxActive;
            }
    });

app.controller('roastPageController', function ($scope,$http,$location,$routeParams){



    var roastID = '/roastTitle/' + $routeParams.id;

    $http.get(roastID).success(function(data){
        $scope.roastTitle = data[0];
    }).error(function(data){
        console.log(data);
    });

    $scope.roast = {};
    $scope.postBlockActive = false;
    $scope.appreciated = false;
    $scope.appriValue = 'Appreciate';
    $scope.hideTextArea = function () {
        $scope.postBlockActive = false;
    }
    $scope.showTextArea = function () {
        $scope.postBlockActive = true;
        console.log('show is working');
    }
    $scope.appreciate = function (roast) {
        $scope.appreciated = true;
        $scope.appriValue = 'Appreciated';
        console.log(roast.name);
    }
    $scope.anonyClicked = function (value) {
        console.log(value);
    }

    $scope.postBlockActive = false;
    $scope.textFocus = function () {
        $scope.postBlkActv = true;
    };

    var commentID = '/roastComments/' + $routeParams.id;

    $scope.fetchRComments = function(){
        $http.get(commentID).success(function(data){

            console.log(data);
            $scope.roasts = data;
        }).error(function(data){

        });
    };

    $scope.fetchRComments();

    $scope.rComment = {};
    $scope.rComment.name = 'Anonymous';
    $scope.rComment.id = $routeParams.id;

    $scope.postRComment = function(){
    
        console.log('i posted raosted');

        $http.post('/roastComment', $scope.rComment).success(function(data){

            $scope.fetchRComments();
            $scope.hideTextArea();
            $scope.rComment.comment = null;

        }).error(function(data){

        })
    };

});

app.controller('roastTrendingController', function($scope,$location,$http,$routeParams){

    $scope.goToRoast = function(){
         window.scrollTo(0,0);
        $location.path('/roast');
    }

    $http.get('/trendingDebates').success(function(data){
        console.log(data[0]);
        $scope.questions = data;

    }).error(function(data){
        console.log(data);
    })

    $scope.goToDebate = function(question){

        window.scrollTo(0,0);
        var debateID = '/QandA/' + question._id;
        
        $location.path(debateID);
    }

});


app.controller('roastCreateController', function($scope,$http){

    console.log("trending page");

    $scope.roast = {};
    $scope.debate = {};
    $scope.debate.yes = 1;
    $scope.debate.no = 1;
    $scope.debate.createdOn = new Date();

    $scope.postRoast = function(){

        $scope.waiting = true;

        $http.post('/createRoast', $scope.roast).success(function(data){
            console.log(data);
            $scope.roast = null;
            $scope.waiting = false;
        }).error(function(data){
            $scope.waiting = false;
        })
    }

    $scope.postDebate = function(){

        $scope.waiting = true;

        console.log('adadad');

        $http.post('/createDebate', $scope.debate).success(function(data){
            console.log(data);
            $scope.waiting = false;
            $scope.debate  = null;
        }).error(function(data){
            $scope.waiting = false;
        })
    }    

});



app.controller('QandApageController', function ($scope,$http,$routeParams,$location) {


    $scope.postBlockActive = false;
    $scope.appreciated = false;
    $scope.appriValue = 'Appreciate';
    $scope.hideTextArea = function () {
        $scope.postBlockActive = false;
    }
    $scope.showTextArea = function () {
        $scope.postBlockActive = true;
        console.log('show is working');
    }
    $scope.appreciate = function (roast) {
        $scope.appreciated = true;
        $scope.appriValue = 'Appreciated';
        console.log(roast.name);
    }
    $scope.anonyClicked = function (value) {
        console.log(value);
    }
    /*$scope.textFocus = function () {
        $scope.postBlkActv = true;
    }*/

    $scope.calcVote = function(){

        $scope.yesVotes = $scope.questions.yes;
        $scope.noVotes = $scope.questions.no;
        $scope.TotalVotes = $scope.yesVotes + $scope.noVotes;
            
        var yPercent = ($scope.yesVotes/$scope.TotalVotes)*100,
            nPercent = ($scope.noVotes/$scope.TotalVotes)*100;
        $scope.yRoundOff = Math.round(yPercent);
        $scope.nRoundOff = Math.round(nPercent);
    }

    // for getting debate title

    $scope.showVoteBlock = true;

    var debateID = '/debateTitle/' + $routeParams.id;

    $http.get(debateID).success(function(data){
        console.log(data[0]);
        $scope.questions = data[0];

        if ($scope.questions.debate === "Y") {
            $scope.calcVote();
        }
        else{$scope.showVoteBlock = false;}

    }).error(function(data){
        console.log(data);
    });

    $scope.goToCreateQ = function(){
        $location.path('/create');
        window.scrollTo(500,500);
    }

    $scope.voteObject = {};
    $scope.voteObject.id = $routeParams.id;

    $scope.vote = function(){
        $http.post('/vote', $scope.voteObject).success(function(data){
            console.log(data);
        }).error(function(data){

        })
    };

        $scope.votedY = function(value){
            $scope.showVotes = true;
            $scope.voteObject.value = 'Y';
            $scope.yesVotes = $scope.questions.yes + 1;
            $scope.calcVote();
            $scope.vote();
        };
        $scope.votedN = function(value){
            $scope.showVotes = true;
            $scope.voteObject.value = 'N';
            $scope.noVotes = $scope.questions.no + 1;
            $scope.calcVote();
            $scope.vote();
        };


    $scope.comment = {};

    $scope.comment.id = $routeParams.id; 
    $scope.comment.name = 'Anonymous';
    $scope.comment.createdOn = new Date();

    var commentID = '/debateComments/' + $routeParams.id;

    $scope.fetchComments = function(){
        $http.get(commentID).success(function(data){

            console.log(data);
            $scope.QandA = data;
        }).error(function(data){

        });
    };

    $scope.fetchComments();
    

    // for posting comment

    $scope.post = function(){
    
        console.log('i posted');

        $http.post('/debateComment', $scope.comment).success(function(data){

            $scope.fetchComments();
            $scope.hideTextArea();
            $scope.comment.comment = null;

        }).error(function(data){

        })
    }   
   
});


app.controller('roastListController', function($scope,$http,$location,$routeParams){

    $http.get('/allRoasts').success(function(data){
        console.log("inside roast list");
        $scope.roastList = data;
    }).error(function(data){
        //console.log(data);
    })

    $scope.goToRoast = function(content){
         window.scrollTo(0,0);
         var roastID = '/roast/' + content._id;
        $location.path(roastID);
    }
    
});



app.controller('QandAlistController', function($http,$scope,$location,$routeParams){

    $http.get('/allDebates').success(function(data){
        console.log(data[0]);
        $scope.questions = data;

    }).error(function(data){
        console.log(data);
    })

    $scope.goToDebate = function(question){

        window.scrollTo(0,0);
        var debateID = '/QandA/' + question._id;
        
        $location.path(debateID);
    }
})

app.controller('QandAcategoryController', function(){
    
})


app.controller('errorController', function($scope){

});
