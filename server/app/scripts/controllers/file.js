'use strict';

angular.module('serverApp')
  .controller('FileCtrl', function ($scope, $http, File, $modal, hotkeys, $q) {
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
    

    $scope.deleteSelectedFiles = function(){
      var promises = [];
      angular.forEach($scope.files, function(file, i){
        if (file.selected) {
          var id = file._id;
          promises.push(File.delete({ id: id }).$promise);
        }
      });

      if (promises.length < 1) {
        return;
      }

      $q.all(promises).then(function(){
        $scope.files = File.query();
      });
    };

    $scope.selectedAll = false;
    $scope.selectAll = function(){
      angular.forEach($scope.files, function(file, i){
        file.selected = !$scope.selectedAll;
      });

      $scope.selectedAll = !$scope.selectedAll;
    };

    $scope.isAllSelected = function(){
      var selected = true;
      angular.forEach($scope.files, function(file, i){
        selected = file.selected && selected;
      });

      if($scope.files.length < 1){
        selected = false;
      }

      $scope.selectedAll = selected;
      return selected;
    };

    hotkeys.add('alt+u', 'Upload files', function(event, hotkey){
      event.preventDefault();
      $scope.addFile();
    });
  });
