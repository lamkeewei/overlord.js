'use strict';

angular.module('serverApp')
  .filter('highlight', function () {
    return function (input, search) {
      if(!search) {
        return input;
      }
      return input.replace(new RegExp(search, 'gi'), '<span class="highlight">' + search + '</span>');
    };
  });
