'use strict';

angular.module('serverApp')
  .controller('UploadCtrl', function ($scope, $http, Resumable) {
    $scope.r = new Resumable({
      target: '/api/upload'
    });
    $scope.r.on('fileAdded', function(file){
      console.log(file);
      $scope.$apply();
    });
  });
