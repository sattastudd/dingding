var app = angular.module('roast',['ngRoute']);


app.config(function($routeProvider,$locationProvider) {
        $routeProvider

            // route for the home page
            .when('/roastPage', {
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

app.controller('roastTrendingController', function($scope,$location){

    $scope.goToRoast = function(){
         window.scrollTo(0,0);
        $location.path('/roastPage');
    }
    $scope.trending=[{image:'http://qph.is.quoracdn.net/main-thumb-65424091-200-qfewjnaxxfuqpiqwdlmljcqfxobsefrf.jpeg',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},{image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'},
                    {image:'',quote:'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,consectetur, adipisci velit...',name:'Satish Mishra',roastCounter:'2.1K',rpm:'12'}];

});


app.controller('roastCreateController', function($scope,$http){

    console.log("trending page");

    $scope.name = {name:'save ho ja bhai'};

    $scope.postRoast = function(){

        $scope.waiting = true;

        $http.get('/api/postData').success(function(data){
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


app.controller('errorController', function($scope){

});
