// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','btford.socket-io'])

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
      url: '/chat/:username/:avartar',
      templateUrl:'templates/chat.html'
    });
    $urlRouterProvider.otherwise('login');
})
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('localhost:3000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})
.controller('LoginController',function($scope, $state,$ionicPopup){
  var vm = this;
  $scope.join=function(username,avartar){ 
    if (username) {
      if(avartar){
         $scope.avartar = avartar;
        }
        else
        {
          $scope.avartar = "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png";
        }
        $state.go('chat',{username:username,avartar:avartar});        
      } 
    else{
        var alertPopup = $ionicPopup.alert({
           title: 'Error!',
           template: 'You must enter your nickname!'
         });
    }
  };
})
.controller('ChatController',function($scope,$state,mySocket){
    $scope.messages=[];
    $scope.username = $state.params.username;
    var data={message: 'user has joined',sender:$scope.username};
    mySocket.on('connect',function(){
       mySocket.emit("Message",data);
    });
    mySocket.on('Message', function(data) {
      $scope.messages.push(data);
    });
    $scope.sendMessage=function(){
        var newMessage ={sender:'',message:''};
        newMessage.sender = $scope.username;
        newMessage.message = $scope.message;
        mySocket.emit("Message",newMessage);
    }
});
