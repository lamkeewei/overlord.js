'use strict';

angular.module('serverApp')
  .controller('FileCtrl', function ($scope, $http, File, $modal) {
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
  });
