'use strict';

angular.module('serverApp')
  .controller('ScriptCtrl', function ($scope, $http, Socket, highlightFilter, Box) {
    $scope.editorOptions = {
      mode: 'sh'
    };

    $scope.boxes = Box.query();
    $scope.replies = [];
    $scope.search = {};

    $scope.runCommand = function(){
      var data = {
        command: $scope.command
      };

      Socket.emit('run-command', data, function(results){
        $scope.numSuccess = 0;
        angular.forEach(results, function(r, i){
          if (r.code === 0 ) {
            $scope.numSuccess += 1;
          }
        });

        $scope.replies = results;
        $scope.search = {};
      });
    };

    $scope.reset = function(){
      $scope.command = '';
      $scope.search = {};
      $scope.replies = [];
    };

    $scope.isAllSuccessful = function(){
      return $scope.numSuccess === $scope.replies.length;
    };
  });
