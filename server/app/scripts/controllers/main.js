'use strict';

angular.module('serverApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, Box) {
    $scope.boxes = Box.query();
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
  });
