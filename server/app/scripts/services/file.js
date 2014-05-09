'use strict';

angular.module('serverApp')
  .factory('File', function ($resource) {
    return $resource('/api/files/:id:action/:deployId', {},
      {
        deploy: {
          method: 'GET',
          params: {
            action: 'deploy'
          }
        }
      });
  });
