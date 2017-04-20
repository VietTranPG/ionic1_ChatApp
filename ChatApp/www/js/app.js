// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl:'templates/login.html'
    })
    .state('chat',{
      url: '/chat/:username',
      templateUrl:'templates/chat.html'
    });
    $urlRouterProvider.otherwise('login');
})
.controller('LoginController',function($scope, $state,$ionicPopup){
  var vm = this;
  $scope.join=function(username){ 
    if ($scope.username) {
        $state.go('chat',{username:username});
        
    }
    else{
        var alertPopup = $ionicPopup.alert({
           title: 'Error!',
           template: 'You must enter your nickname!'
         });
    }
  };
})



.controller('ChatController',function($scope,$state){
    $scope.username = $state.params.username;
});
