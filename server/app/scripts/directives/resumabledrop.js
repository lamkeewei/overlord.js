'use strict';

angular.module('serverApp')
  .directive('resumableDrop', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.r.assignDrop(element);

        element.on('dragover', function(event){
          element.addClass('resumable-dragover');
        });

        element.on('dragleave', function(event){
          element.removeClass('resumable-dragover');
        });

        element.on('drop', function(event){
          element.removeClass('resumable-dragover');
        });
      }
    };
  });
