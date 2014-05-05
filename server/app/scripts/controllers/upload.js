'use strict';

angular.module('serverApp')
  .controller('UploadCtrl', function ($scope, $http, Resumable, $location) {
    $scope.haveFiles = false;

    $scope.r = new Resumable({
      target: '/api/upload',
      simultaneousUploads: 3
    });
    
    $scope.r.on('fileAdded', function(file){
      $scope.haveFiles = true;
      $scope.$apply();
    });

    $scope.r.on('complete', function(){
      if ($scope.r.files.length > 0){
        $scope.$apply(function(){
          $scope.haveFiles = false;
        });
      }
    });

    $scope.r.on('cancel', function(){
      $scope.haveFiles = false;
    });
  });
