'use strict';

angular.module('serverApp')
  .factory('Box', function ($resource) {
    return $resource('/api/boxes/:name', {},
    {
      update: {
        method: 'PUT',
        params: '@name'
      }
    });
  });
