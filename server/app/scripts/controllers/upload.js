'use strict';

angular.module('serverApp')
  .controller('UploadCtrl', function ($scope, $http, Resumable) {
    $scope.haveFiles = false;

    $scope.r = new Resumable({
      target: '/api/upload'
    });
    
    $scope.r.on('fileAdded', function(file){
      $scope.haveFiles = true;
      $scope.$apply();
    });

    $scope.r.on('fileRetry', function(){
      console.log('file retry');
      $scope.$apply();
    });

    $scope.r.on('complete', function(){
      $scope.$apply(function(){
        $scope.haveFiles = false;
      });
    });

    $scope.r.on('cancel', function(){
      $scope.haveFiles = false;
    });

    $scope.r.on('catchAll', function(event){
      console.log(event);
    });
  });
