'use strict';

angular.module('serverApp')
  .controller('ScriptCtrl', function ($scope, $http, Socket, highlightFilter) {
    $scope.editorOptions = {
      mode: 'sh'
    };

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
      });
    };

    $scope.isAllSuccessful = function(){
      return $scope.numSuccess === $scope.replies.length;
    };
  });
