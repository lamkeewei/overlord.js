'use strict';

angular.module('serverApp')
  .directive('focus', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $timeout(function(){
          element[0].focus();
        }, 600);
      }
    };
  });
