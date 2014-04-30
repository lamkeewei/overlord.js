'use strict';

angular.module('serverApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.links = [
      {
        title: 'Servers',
        link: '/'
      }, {
        title: 'Scripts',
        link: '/scripts'
      }
    ];

    if(Auth.currentUser()){
      Auth.currentUser().$promise.then(function(user){
        $scope.user = user;
      });
    }

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isLoggedIn = function(){
      return Auth.isLoggedIn();
    };
  });
