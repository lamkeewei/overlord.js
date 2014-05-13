'use strict';

angular.module('serverApp')
  .controller('UploadCtrl', function ($scope, $http, $modalInstance, Resumable, $location, _) {
    $scope.haveFiles = false;
    $scope.image = {};
    $scope.submitted = false;
    console.log($scope.imageForm);

    $scope.r = new Resumable({
      target: '/api/files/upload',
      simultaneousUploads: 3
    });
    
    $scope.r.on('fileAdded', function(file){
      $scope.haveFiles = true;
      $scope.$apply();
    });

    $scope.r.on('complete', function(){
      if ($scope.r.files.length > 0){
        $scope.image.files = _.map($scope.r.files, function(f){
          return {
            identifier: f.uniqueIdentifier,
            fileName: f.fileName
          };
        });

        $scope.$apply(function(){
          $scope.haveFiles = false;
          $modalInstance.close();
        });
      }
    });

    $scope.r.on('cancel', function(){
      $scope.haveFiles = false;
    });

    $scope.upload = function(form){
      $scope.submitted = true;

      if(form.$invalid){
        return;
      }

      $scope.r.upload();
    };
  });
