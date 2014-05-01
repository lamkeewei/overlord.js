'use strict';

angular.module('serverApp')
  .controller('BoxCtrl', function ($scope, Box, $modalInstance) {
    $scope.box = {};

    $scope.addBox = function(form){
      $scope.submitted = true;

      if(form.$valid){
        var box = new Box($scope.box);
        box.$save(function(){
          $scope.box = {};
          $scope.submitted = false;
          $modalInstance.close();
        });
      }
    };
  });
