'use strict';

angular.module('serverApp')
  .controller('ScriptCtrl', function ($scope, $http) {
    $scope.editorOptions = {
      mode: 'sh'
    };
  });
