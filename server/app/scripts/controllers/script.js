'use strict';

angular.module('serverApp')
  .controller('ScriptCtrl', function ($scope, $http, Socket) {
    $scope.editorOptions = {
      mode: 'sh',
      theme: 'github'
    };

    $scope.replies = [];

    $scope.runCommand = function(){
      var data = {
        command: $scope.command
      };

      Socket.emit('run-command', data, function(results){
        $scope.replies = results;
      });
      $scope.command = '';
    };
  });
