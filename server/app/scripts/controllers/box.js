'use strict';

angular.module('serverApp')
  .controller('BoxCtrl', function ($scope, Box) {
    $scope.box = {};
    $scope.boxes = Box.query();
    $scope.selectedBox = 'New Box';

    $scope.$watch('selectedBox', function(newVal, oldVal){
      if(newVal !== 'New Box'){
        $scope.box = Box.get({ name: newVal }, function(data){
          console.log(data);
        });
      }
    });

    $scope.addBox = function(form){
      $scope.submitted = true;

      if(form.$valid){
        var box = new Box($scope.box);
        box.$save(function(){
          $scope.boxes.push($scope.box);
          $scope.box = {};
          $scope.submitted = false;
        });
      }
    };
  });
