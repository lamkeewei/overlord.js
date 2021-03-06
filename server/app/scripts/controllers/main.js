'use strict';

angular.module('serverApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, Box, $modal, hotkeys, $q, Socket) {
    $scope.boxes = Box.query();

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };

    $scope.addServer = function(){
      var modalInstance = $modal.open({
        templateUrl: 'partials/boxes.html',
        controller: 'BoxCtrl',
        resolve: {
          Data: function(){
            return {};
          }
        }
      });

      modalInstance.result.then(function(b){
        var box = new Box(b);
        box.$save(function(){
          $scope.box = {};
          $scope.submitted = false;
          $scope.boxes = Box.query();
        });
      });
    };

    $scope.deleteServer = function(name){
      Box.delete({ name: name }, function(){
        $scope.boxes = Box.query();
      });
    };

    $scope.editServer = function(name){
      var box = Box.get({ name: name }, function(b){
        var modalInstance = $modal.open({
          templateUrl: 'partials/boxes.html',
          controller: 'BoxCtrl',
          resolve: {
            Data: function(){
              return {
                box: b
              };
            }
          }
        });

        modalInstance.result.then(function(b){
          b.$update({ name: b.name }, function(){
            $scope.boxes = Box.query();
          });
        });
      });
    };

    $scope.selectedAll = false;

    $scope.selectAll = function(){
      angular.forEach($scope.boxes, function(box, i){
        box.selected = !$scope.selectedAll;
      });

      $scope.selectedAll = !$scope.selectedAll;
    };

    $scope.deleteSelected = function(){
      var promises = [];
      angular.forEach($scope.boxes, function(box, i){
        if (box.selected) {
          promises.push(Box.delete({ name: box.name }).$promise);
        }
      });

      $q.all(promises).then(function(){
        $scope.boxes = Box.query();
      });
    };

    $scope.isAllSelected = function(){
      var selected = true;
      angular.forEach($scope.boxes, function(box, i){
        selected = box.selected && selected;
      });

      if($scope.boxes.length < 1){
        selected = false;
      }

      $scope.selectedAll = selected;
      return selected;
    };

    $scope.selectAll = function(){
      angular.forEach($scope.boxes, function(box, i){
        box.selected = !$scope.selectedAll;
      });
    };

    $scope.refresh = function(){
      $scope.boxes = Box.query();
    };

    // Socket bindings
    Socket.on('status-change', function(data){
      var name = data.name;
      angular.forEach($scope.boxes, function(box, i){
        if (box.name === name) {
          box.status = data.status;
        }
      });
    });

    // Hotkeys
    hotkeys.add('alt+n', 'New server', function(event, hotkey){
      event.preventDefault();
      $scope.addServer();
    });

    hotkeys.add('alt+x', 'Delete selected servers', function(event, hotkey){
      event.preventDefault();
      $scope.deleteSelected();
    });

    hotkeys.add('alt+a', 'Select all servers', function(event, hotkey){
      event.preventDefault();
      $scope.selectAll();
    });
  });
