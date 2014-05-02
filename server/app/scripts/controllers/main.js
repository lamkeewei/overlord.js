'use strict';

angular.module('serverApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, Box, $modal, hotkeys) {
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

    hotkeys.add('alt+a', 'New server', function(event, hotkey){
      event.preventDefault();
      $scope.addServer();
    });
  });
