'use strict';

angular.module('serverApp')
  .factory('Image', function ($resource) {
    return $resource('/api/images/:id', {}, {});
  });
