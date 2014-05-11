'use strict';

module.exports = function(grunt){
  
  // Load all tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      js: {
        options: {
          reload: true
        },
        files: ['*.js', 'lib/**/*.js'],
        tasks: ['newer:jshint:all']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js', 'lib/**/*.js'
      ]
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    concurrent: {
      dev: {
        tasks: [ 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'concurrent:dev'
  ]);
};