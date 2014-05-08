'use strict';

angular.module('serverApp')
  .controller('FileCtrl', function ($scope, $http, File, $modal, hotkeys) {
    $scope.files = File.query();
    $scope.fileStore = [];

    $scope.addFile = function(){
      var modalInstance = $modal.open({
        templateUrl: 'partials/upload.html',
        controller: 'UploadCtrl'
      });

      modalInstance.result.then(function(reply){
        $scope.files = File.query();
      });
    };

    $scope.deleteFile = function(id){
      File.delete({ id: id }, function(){
        $scope.files = File.query();
      });
    };

    hotkeys.add('alt+u', 'Upload files', function(event, hotkey){
      event.preventDefault();
      $scope.addFile();
    });
  });
