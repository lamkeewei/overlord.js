'use strict';

angular.module('serverApp')
  .controller('ImageCtrl', function ($scope, $http, $filter, File, Image, $modal, hotkeys, $q, Socket) {
    $scope.images = [];
    $scope.imageStore = [];
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

    // UI code for existing image
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

    // UI code for deployed image
    $scope.selectedAllDeployed = false;

    $scope.selectAllDeployed = function(){
      angular.forEach($scope.imageStore, function(file, i){
        file.selected = !$scope.selectedAllDeployed;
      });

      $scope.selectedAllDeployed = !$scope.selectedAllDeployed;
    };

    $scope.isAllSelectedDeployed = function(){
      var selected = true;
      angular.forEach($scope.imageStore, function(file, i){
        selected = file.selected && selected;
      });

      if($scope.imageStore.length < 1){
        selected = false;
      }

      $scope.selectedAllDeployed = selected;
      return selected;
    };

    // Deployment related functions
    $scope.deploy = function(id){
      var deferred = $q.defer();
      Socket.emit('deploy', id, function(err, status){
        if (err) {
          deferred.reject(err);
        }

        deferred.resolve();
      });

      return deferred.promise;
    };

    $scope.deploySelected = function(){
      $scope.isDeploying = true;
      var promises = [];

      angular.forEach($scope.images, function(image, i){
        if (image.selected) {
          promises.push($scope.deploy(image._id));
          image.selected = false;
        }
      });

      $q.all(promises).then(function(){
        $scope.isDeploying = false;
        $scope.init();
      }, function(errs){
        $scope.isDeploying = false;
        console.log(errs);
      });
    };

    $scope.undeploy = function(id){
      Socket.emit('undeploy', id, function(err, status){
        if (err) {
          console.log(err);
          return;
        }
        $scope.init();
      });
    };

    hotkeys.add('alt+u', 'Upload images', function(event, hotkey){
      event.preventDefault();
      $scope.addFile();
    });
  });
