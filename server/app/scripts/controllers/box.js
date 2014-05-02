'use strict';

angular.module('serverApp')
  .controller('BoxCtrl', function ($scope, Box, $modalInstance, Data) {
    $scope.box = {};
    $scope.Data = Data;
    if($scope.Data.box){
      $scope.box = $scope.Data.box;
    }

    $scope.submitForm= function(form){
      $scope.submitted = true;

      if(form.$valid){
        $modalInstance.close($scope.box);
      }
    };
  });
