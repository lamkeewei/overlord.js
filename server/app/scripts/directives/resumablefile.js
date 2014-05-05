'use strict';

angular.module('serverApp')
  .directive('resumableFile', function () {
    return {
      templateUrl: 'partials/resumableFile',
      restrict: 'A',
      replace: true,
      scope: {
        file: '=resumableFile'
      },
      link: function postLink(scope, element, attrs) {
        scope.isComplete = false;
        var resumable = scope.file.resumableObj;
        var fileName = scope.file.fileName;
        var progressBar = element.children('.progress').children('.progress-bar');
        
        resumable.on('fileProgress', function(file){
          if(file.fileName === fileName) {
            var progress = Math.floor(file.progress() * 100);
            progressBar.css('width', progress + '%');
          }
        });

        resumable.on('fileSuccess', function(file){
          if(file.fileName === fileName){
            progressBar.addClass('progress-bar-success');
            scope.isComplete = true;
            scope.$apply();
          }
        });

        scope.retry = function(){
          scope.$apply(function(){
            scope.file.retry();
          });
        };
      }
    };
  });
