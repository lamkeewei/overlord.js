'use strict';

angular.module('serverApp')
  .factory('File', function ($resource) {
    return $resource('/api/files/:id', {});
  });