'use strict';

angular.module('serverApp')
  .directive('resumableBrowse', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.r.assignBrowse(element);
      }
    };
  });
