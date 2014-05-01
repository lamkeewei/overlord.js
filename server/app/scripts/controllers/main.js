'use strict';

angular.module('serverApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, Box, $modal) {
    $scope.boxes = Box.query();
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.addServer = function(){
      var modalInstance = $modal.open({
        templateUrl: 'partials/boxes.html',
        controller: 'BoxCtrl'
      });

      modalInstance.result.then(function(res){
        $scope.boxes = Box.query();
      });
    };
  });
