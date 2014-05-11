'use strict';

angular.module('serverApp')
  .controller('ScriptCtrl', function ($scope, $http, Socket) {
    $scope.editorOptions = {
      mode: 'sh',
      theme: 'github'
    };

    $scope.replies = [];

    $scope.runCommand = function(){
      $scope.replies = [];
      
      var data = {
        command: $scope.command
      };

      Socket.emit('run-command', data);
      $scope.command = '';
    };

    Socket.on('command-reply', function(data){
      $scope.replies.push(data);
      console.log(data.reply);
    });
  });
