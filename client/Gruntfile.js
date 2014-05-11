'use strict';

module.exports = function(grunt){
  
  // Load al tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      js: {        
        files: ['*.js'],
        tasks: ['newer:jshint:all']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js'
      ]
    }
  });
};