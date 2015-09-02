var app = angular.module('roast',['ngRoute']);


app.config(function($routeProvider,$locationProvider) {
        $routeProvider

            // route for the home page
            .when('/roast', {
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
            .when('/roastCategory', {
                templateUrl : '../views/roastCategory.html',
                controller  : 'roastCategoryController'
            })
            .when('/QandA/:id', {
                templateUrl : '../views/QandApage.html',
                controller  : 'QandApageController'
            })
            .when('/QandAcategory', {
                templateUrl : '../views/QandAcategory.html',
                controller  : 'QandAcategoryController'
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
            $scope.goToRoastCategory = function(){
                $location.path('/roastList');
                window.scrollTo(0,0);
                $scope.showToolBox();
            }
            $scope.goToQnAPage = function(){
                $location.path('/QandA');
                window.scrollTo(0,0);
                $scope.showToolBox();
            }

            $scope.toolBoxActive = true;
            $scope.showToolBox = function () {
                $scope.toolBoxActive = !$scope.toolBoxActive;
            }
    });

app.controller('roastPageController', function ($scope){

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

    $scope.roasts = [{
        name: 'Saumya',
        roast: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '2'
    }];

    $scope.postBlockActive = false;
    $scope.textFocus = function () {
        $scope.postBlkActv = true;
    }

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
    $scope.debate.yes = 0;
    $scope.debate.no = 0;
    $scope.debate.createdOn = new Date();

    $scope.postRoast = function(){

        $scope.waiting = true;

        $http.post('/createRoast', $scope.roast).success(function(data){
            console.log(data);
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



app.controller('QandApageController', function ($scope,$http,$routeParams) {


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

    // for getting debate title

    var debateID = '/debateTitle/' + $routeParams.id;

    $http.get(debateID).success(function(data){
        console.log(data[0]);
        $scope.questions = data[0];

        $scope.showVotes = false;
        $scope.yesVotes = $scope.questions.yes;
        $scope.noVotes = $scope.questions.no;
        $scope.TotalVotes = $scope.yesVotes + $scope.noVotes;
        
        var yPercent = ($scope.yesVotes/$scope.TotalVotes)*100,
            nPercent = ($scope.noVotes/$scope.TotalVotes)*100;
        $scope.yRoundOff = Math.round(yPercent);
        $scope.nRoundOff = Math.round(nPercent);

    }).error(function(data){
        console.log(data);
    });

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
            $scope.voteObject.yValue = $scope.questions.yes + 1;
            $scope.vote();
        }
        $scope.votedN = function(value){
            $scope.showVotes = true;
        }


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


app.controller('roastListController', function($scope){

    console.log("inside roast list");

    $scope.goToRoast = function(){
         window.scrollTo(0,0);
        $location.path('/roast');
    }
    $scope.roastList=[{image:'http://qph.is.quoracdn.net/main-thumb-65424091-200-qfewjnaxxfuqpiqwdlmljcqfxobsefrf.jpeg',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},{image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'}];
});


app.controller('roastCategoryController', function(){

})

app.controller('QandAlistController', function(){
    
})

app.controller('QandAcategoryController', function(){
    
})


app.controller('errorController', function($scope){

});
