'use strict';

angular.module('serverApp')
  .controller('UploadCtrl', function ($scope, $http, $modalInstance, Resumable, $location, _, Image) {
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
            name: f.fileName,
            identifier: f.uniqueIdentifier
          };
        });

        var image = new Image($scope.image);

        image.$save(function(){
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
