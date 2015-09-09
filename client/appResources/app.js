var app = angular.module('roast',['ngRoute','ngStorage']);


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

            // code for custom modal
            $scope.modalOpen = false;
            
            $scope.loginModal = function(){
                   $scope.modalOpen = !$scope.modalOpen;
            }
            $scope.cancelModal = function(){
                $scope.modalOpen = false;
            }
    });

app.controller('roastPageController', function ($scope,$http,$location,$routeParams,$interval){



    var roastID = '/roastTitle/' + $routeParams.id;

    $http.get(roastID).success(function(data){
        $scope.roastTitle = data[0];
    }).error(function(data){
        console.log(data);
    });

    $scope.roast = {};
    $scope.newDataR = {};
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

            if (data.length === 1){
                $scope.newDataR.oldDate = data[0].createdOn;
            }else if (data.length > 1){
                $scope.newDataR.oldDate = data[data.length - 1].createdOn;
            }else{
                //$scope.newDataR.oldDate = new Date();
            }
            console.log($scope.newDataR.oldDate);


            $scope.roasts = data;
        }).error(function(data){

        });
    };

    $scope.fetchRComments();

    // for fetching comments on regular intervals

    $interval($scope.newCommentsR, 30000);

    $scope.newCommentsR = function (){
        console.log('new comments');
        $scope.newDataR.id = $routeParams.id;
        $http.post('/newRcomments', $scope.newDataR).success(function(data){
            console.log(data);

            if (data.length === 1){
                $scope.newDataR.oldDate = data[0].createdOn;
            }else if (data.length > 1){
                $scope.newDataR.oldDate = data[data.length - 1].createdOn;
            }
            console.log($scope.newDataR.oldDate);
            angular.forEach( data, function( item ) {
        	$scope.roasts.push( item )
        });
        }).error(function(data){

        })
    };


    $scope.rComment = {};
    $scope.rComment.name = 'Anonymous';
    $scope.rComment.id = $routeParams.id;

    $scope.rCommentChar = 2000;

    $scope.$watch('rComment.comment', function() {
        if(angular.isDefined($scope.rComment.comment)){
           $scope.rCommentChar = 2000 - $scope.rComment.comment.length;
           if ($scope.rCommentChar === 0) {
                $scope.rCommentChar = 0;
           };
       };
    });


    var valid = null;

    $scope.postRComment = function(){
    
        if ($scope.rComment.comment === null || $scope.rComment.comment === "" || angular.isUndefined($scope.rComment.comment)) {
                valid = false
        }else{valid = true};

        if (valid === true){
            $http.post('/roastComment', $scope.rComment).success(function(data){

                $scope.newCommentsR();
                $scope.hideTextArea();
                $scope.rComment.comment = null;

            }).error(function(data){

            });
        };
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


app.controller('roastCreateController', function($scope,$http,$location,$routeParams){

    console.log("trending page");

    $scope.roast = {};
    $scope.debate = {};
    $scope.debate.yes = 1;
    $scope.debate.no = 1;
    $scope.debate.createdOn = new Date();
    $scope.nameChar = 50;
    $scope.descChar = 150;
    $scope.qChar = 150;

    $scope.$watch('roast.name', function() {
        if(angular.isDefined($scope.roast.name)){
           $scope.nameChar = 50 - $scope.roast.name.length;
           if ($scope.nameChar === 0) {
                $scope.nameChar = 0;
           };
       };
    });
    $scope.$watch('roast.quote', function() {
        if(angular.isDefined($scope.roast.quote)){
           $scope.descChar = 150 - $scope.roast.quote.length;
           if ($scope.descChar === 0) {
                $scope.descChar = 0;
           };
       };
    });
    $scope.$watch('debate.question', function() {
        if(angular.isDefined($scope.debate.question)){
            $scope.qChar = 150 - $scope.debate.question.length;
            if ($scope.qChar === 0) {
                $scope.qChar = 0;
            };
        };
    });

    $scope.single = function(image) {
                    var formData = new FormData();
                    formData.append('image', image, image.name);
                    $http.post('upload', formData, {
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    }).success(function(result) {
                        $scope.uploadedImgSrc = result.src;
                        $scope.sizeInBytes = result.size;
                    });
                };

    var valid  = null;

    $scope.postRoast = function(){

            if ($scope.roast.name === null || $scope.roast.name === "" || angular.isUndefined($scope.roast.name)) {
                valid = false;
            }else 
            if ($scope.roast.quote === null || $scope.roast.quote === "" || angular.isUndefined($scope.roast.quote)) {
                valid = false
            }else{valid = true};

        if (valid === true) {
            $scope.waiting = true;
            $http.post('/createRoast', $scope.roast).success(function(data){
                $scope.waiting = false;
                var roastID = '/roast/' + data._id;
                $location.path(roastID);
            }).error(function(data){
                $scope.waiting = false;
            })
        };
    };

    var validQ = null;

    $scope.postDebate = function(){

         if ($scope.debate.question === null || $scope.debate.question === "" || angular.isUndefined($scope.debate.question)) {
                validQ = false
        }else{validQ = true};

        if(validQ === true){
            $scope.waiting = true;
            $http.post('/createDebate', $scope.debate).success(function(data){
                $scope.waiting = false;
                var debateID = '/QandA/' + data._id;
                $location.path(debateID);
            }).error(function(data){
                $scope.waiting = false;
            })
        };
    };

});



app.controller('QandApageController', function ($scope,$http,$routeParams,$location,$interval,$localStorage) {


    $scope.postBlockActive = false;
    $scope.appreciated = false;
    $scope.appriValue = 'Appreciate';
    $scope.appri = {};
    $scope.hideTextArea = function () {
        $scope.postBlockActive = false;
    }
    $scope.showTextArea = function () {
        $scope.postBlockActive = true;
        console.log('show is working');
    }
    $scope.appreciate = function (qna) {
        //$scope.appreciated = true;
        //$scope.appriValue = 'Appreciated';

        $scope.appri.commentID = qna._id;
        $scope.appri.qnaID = $routeParams.id;

        $http.post('/appriQnA', $scope.appri).success(function(data){
            console.log(data);
        }).error(function(data){

        });
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
        window.scrollTo(1000,1000);
        $location.path('/create');
    }

    $scope.voteObject = {};
    $scope.voteObject.id = $routeParams.id;

    $scope.vote = function(){

        $http.post('/vote', $scope.voteObject).success(function(data){
            console.log(data);
        }).error(function(data){

        })
    };

        /*$scope.$storage = $localStorage.$default({
                showVotes: false
        });*/

        $scope.votedY = function(value){
            $scope.voteObject.value = 'Y';
            $scope.showVotes = true;
            $scope.yesVotes = $scope.questions.yes + 1;
            $scope.calcVote();
            $scope.vote();
        };
        $scope.votedN = function(value){
            $scope.voteObject.value = 'N';
            $scope.showVotes = true;
            $scope.noVotes = $scope.questions.no + 1;
            $scope.calcVote();
            $scope.vote();
        };


    $scope.comment = {};
    $scope.newDataQ = {};

    $scope.comment.id = $routeParams.id; 
    $scope.comment.name = 'Anonymous';
    $scope.comment.createdOn = new Date();

    var commentID = '/debateComments/' + $routeParams.id;

    $scope.fetchComments = function(){
        $http.get(commentID).success(function(data){

            if (data.length === 1){
                $scope.newDataQ.oldDate = data[0].createdOn;
            }else if (data.length > 1){
                $scope.newDataQ.oldDate = data[data.length - 1].createdOn;
            }else{
                //$scope.newDataQ.oldDate = new Date();
            }
            $scope.QandA = data;
        }).error(function(data){

        });
    };

    $scope.fetchComments();

    // for fetching comments on regular intervals

    $interval($scope.newCommentsQ, 30000);

    $scope.newCommentsQ = function (){
        console.log('new comments');
        $scope.newDataQ.id = $routeParams.id;
        $http.post('/newQcomments', $scope.newDataQ).success(function(data){
            console.log(data);

            if (data.length === 1){
                $scope.newDataQ.oldDate = data[0].createdOn;
            }else if (data.length > 1){
                $scope.newDataQ.oldDate = data[data.length - 1].createdOn;
            }
            console.log($scope.newDataQ.oldDate);
             angular.forEach( data, function( item ) {
        	$scope.QandA.push( item )
        });
        }).error(function(data){

        })
    };
    

    // for posting comment

    $scope.qCommentChar = 2000;

    $scope.$watch('comment.comment', function() {
        if(angular.isDefined($scope.comment.comment)){
           $scope.qCommentChar = 2000 - $scope.comment.comment.length;
           if ($scope.qCommentChar === 0) {
                $scope.qCommentChar = 0;
           };
       };
    });

    var valid = null;

    $scope.post = function(){

        if ($scope.comment.comment === null || $scope.comment.comment === "" || angular.isUndefined($scope.comment.comment)) {
                valid = false
            }else{valid = true};

        if(valid === true){
            $http.post('/debateComment', $scope.comment).success(function(data){

                $scope.newCommentsQ();
                $scope.hideTextArea();
                $scope.comment.comment = null;

            }).error(function(data){

            });
        };
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



// directives start here 


app.directive('myMaxlength', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var maxlength = Number(attrs.myMaxlength);
      function fromUser(text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          } 
          return text;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  }; 
});


// dirctive for image upload

app.directive('image', function($q) {
        'use strict'

        var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        }

        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            var quality = options.resizeQuality || 0.7;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function(url, callback) {
            var image = new Image();
            image.onload = function() {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };


        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?',
            },
            link: function postLink(scope, element, attrs, ctrl) {

                var doResizing = function(imageResult, callback) {
                    createImage(imageResult.url, function(image) {
                        var dataURL = resizeImage(image, scope);
                        imageResult.resized = {
                            dataURL: dataURL,
                            type: dataURL.match(/:(.+\/.+);/)[1],
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function(imageResult) {
                    scope.$apply(function() {
                        //console.log(imageResult);
                        if(attrs.multiple)
                            scope.image.push(imageResult);
                        else
                            scope.image = imageResult; 
                    });
                };


                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if(attrs.multiple)
                        scope.image = [];

                    var files = evt.target.files;
                    for(var i = 0; i < files.length; i++) {
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function(imageResult) {
                                applyScope(imageResult);
                            });
                        }
                        else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });
            }
        };
    });
