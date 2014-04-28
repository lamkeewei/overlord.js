'use strict';

angular.module('serverApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
