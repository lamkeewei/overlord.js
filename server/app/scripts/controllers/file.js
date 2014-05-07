'use strict';

angular.module('serverApp')
  .controller('FileCtrl', function ($scope, $http, File) {
    $scope.files = File.query();
    $scope.fileStore = [];
  });
