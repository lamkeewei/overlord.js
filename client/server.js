'use strict';

var sys = require('sys'),
    exec = require('child_process').exec,
    io = require('socket.io-client'),
    socket = io.connect('http://localhost:9000/minions'),
    config = require('./lib/config/config');

socket.on('connect', function(){
  socket.emit('online', { name: config.name });
});

socket.on('run-command', function(data, fn){
  var command = data.command;

  exec(command, function(error, stdout, stderr){
    fn(stdout);
  });
});