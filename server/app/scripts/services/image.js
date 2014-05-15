'use strict';

angular.module('serverApp')
  .factory('Image', function ($resource) {
    return $resource('/api/images/:id:action/:deployId', {},
      {
        deploy: {
          method: 'GET',
          params: {
            action: 'deploy'
          }
        },
        undeploy: {
          method: 'GET',
          params: {
            action: 'undeploy'
          }
        }
      });
  });
