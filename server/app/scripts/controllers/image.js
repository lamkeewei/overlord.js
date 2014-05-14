'use strict';

angular.module('serverApp')
  .controller('ImageCtrl', function ($scope, $http, $filter, File, Image, $modal, hotkeys, $q) {
    $scope.images = [];
    $scope.isDeploying = false;

    $scope.init = function(){
      Image.query(function(images){
        $scope.imageStore = $filter('filter')(images, { deployed: true });
        $scope.images = $filter('filter')(images, { deployed: false });
      });
    };

    $scope.init();

    $scope.addImage = function(){
      var modalInstance = $modal.open({
        templateUrl: 'partials/upload.html',
        controller: 'UploadCtrl'
      });

      modalInstance.result.then(function(reply){
        $scope.init();
      });
    };

    $scope.deleteImage = function(id){
      Image.delete({ id: id }, function(){
        $scope.init();
      });
    };
    
    $scope.deleteSelectedImages = function(){
      var promises = [];
      angular.forEach($scope.images, function(file, i){
        if (file.selected) {
          var id = file._id;
          promises.push(Image.delete({ id: id }).$promise);
        }
      });

      if (promises.length < 1) {
        return;
      }

      $q.all(promises).then(function(){
        $scope.init();
      });
    };

    $scope.selectedAll = false;
    $scope.selectAll = function(){
      angular.forEach($scope.images, function(file, i){
        file.selected = !$scope.selectedAll;
      });

      $scope.selectedAll = !$scope.selectedAll;
    };

    $scope.isAllSelected = function(){
      var selected = true;
      angular.forEach($scope.images, function(file, i){
        selected = file.selected && selected;
      });

      if($scope.images.length < 1){
        selected = false;
      }

      $scope.selectedAll = selected;
      return selected;
    };

    $scope.deploySelected = function(){
      $scope.isDeploying = true;
      var promises = [];

      angular.forEach($scope.images, function(file, i){
        if (file.selected) {
          promises.push(File.deploy({ deployId: file._id }).$promise);
          file.selected = false;
        }
      });

      $q.all(promises).then(function(){
        $scope.isDeploying = false;
        $scope.init();
      });
    };

    $scope.undeploy = function(id){
      File.undeploy({ deployId: id }, function(){
        $scope.init();
      });
    };

    hotkeys.add('alt+u', 'Upload images', function(event, hotkey){
      event.preventDefault();
      $scope.addFile();
    });
  });
