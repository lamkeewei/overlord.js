'use strict';

angular.module('serverApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      title: 'Home',
      link: '/'
    }, {
      title: 'Settings',
      link: '/settings'
    }, {
      title: 'Boxes',
      link: '/boxes'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
