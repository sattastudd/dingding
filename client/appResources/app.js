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
            .when('/QandA', {
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
            };
            $scope.goToTrending = function(){
                $location.path('/');
                window.scrollTo(0,0);
            };
            $scope.goToHome = function(){
                $location.path('/home');
                console.log('alpha to charlie');
            }
            $scope.goToRoastCategory = function(){
                $location.path('/roastList');
                console.log('alpha to charlie');
            }
            $scope.goToQnAPage = function(){
                $location.path('/QandA');
                console.log('alpha to charlie');
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
    }, {
        name: 'Gaurav',
        roast: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '3'
    }, {
        name: 'Mayank',
        roast: 'Lorem ipsum dolor sit amet,',
        appreciation: '3'
    }, {
        name: 'Magan',
        roast: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '5'
    }, {
        name: 'Ashish',
        roast: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '4'
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

    $http.get('/getTrending').success(function(data){
        console.log(data[0]);
        $scope.questions = data[0];

    }).error(function(data){
        console.log(data);
    })

    $scope.goToDebate = function(){

        window.scrollTo(0,0);
        $location.path('/QandA');

       
    }
});


app.controller('roastCreateController', function($scope,$http){

    console.log("trending page");

    $scope.roast = {};
    $scope.debate = {};
    $scope.debate.yes = 0;
    $scope.debate.no = 0;

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
        }).error(function(data){
            $scope.waiting = false;
        })
    }

    // this is for uploading image
   /* $scope.single = function(image) {
                    var formData = new FormData();
                    formData.append('image', image, image.name);
                    $http.post('upload', formData, {
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    }).success(function(result) {
                        $scope.uploadedImgSrc = result.src;
                        $scope.sizeInBytes = result.size;
                    });
                };*/
    

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


app.controller('QandApageController', function ($scope,$http,$routeParams) {

    $http.get('/getTrending').success(function(data){
        console.log(data);
        $scope.questions = data[0];

        $scope.showVotes = false;
        $scope.yesVotes = $scope.questions.yes;
        $scope.noVotes = $scope.questions.no;
        $scope.TotalVotes = $scope.yesVotes + $scope.noVotes;
        
        var yPercent = ($scope.yesVotes/$scope.TotalVotes)*100,
            nPercent = ($scope.noVotes/$scope.TotalVotes)*100;
        $scope.yRoundOff = Math.round(yPercent);
        $scope.nRoundOff = Math.round(nPercent);
        
        $scope.votedY = function(value){
            $scope.showVotes = true;
        }
        $scope.votedN = function(value){
            $scope.showVotes = true;
        }

    }).error(function(data){
        console.log(data);
    })

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

    //var debateID = '/getDebate/' + $routeParams.id;

     $http.get('/getDebate').success(function(data){
            console.log(data);
        }).error(function(data){
            console.log(data);
        })

    $scope.QandA = [{
        name: 'Saumya',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '2'
    }, {
        name: 'Gaurav',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '3'
    }, {
        name: 'Mayank',
        comment: 'Lorem ipsum dolor sit amet,',
        appreciation: '3'
    }, {
        name: 'Magan',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '5'
    }, {
        name: 'Ashish',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        appreciation: '4'
    }];

    $scope.postBlockActive = false;
    $scope.textFocus = function () {
        $scope.postBlkActv = true;
    }
    
    // this ection is for broadcast of loader gif
    /* function firstCtrl($scope)
    {
        $scope.$emit('loader', true);
    }

    function secondCtrl($scope)
    {
        $scope.$on('loader', function(value) { console.log(value); });
    } */
});


app.controller('roastCategoryController', function(){

})

app.controller('QandAlistController', function(){
    
})

app.controller('QandAcategoryController', function(){
    
})


app.controller('errorController', function($scope){

});
