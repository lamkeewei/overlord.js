'use strict';

var sys = require('sys'),
    exec = require('child_process').exec,
    io = require('socket.io-client'),
    socket = io.connect('http://localhost:9000/minions'),
    config = require('./lib/config/config'),
    Rsync = require('rsync');

socket.on('connect', function(){
  socket.emit('online', { name: config.name });
});

socket.on('run-command', function(data, fn){
  var command = data.command;

  exec(command, function(err, stdout, stderr){
    var exitCode = 0;
    var reply = stdout;

    if (err) {
      exitCode = err.code;
      reply = stderr;
    }

    var data = {
      code: exitCode,
      reply: reply
    };

    fn(data);
  });
});

socket.on('rsync', function(data){
  var rsync = new Rsync();
  rsync
    .flags('atvuP')
    .source('../server/deploy/')
    .destination('./deploy');

  rsync.execute(function(err, code, cmd){
    if (err) {
      console.log(err);
    }

    console.log('Executed', cmd);
  }, function(data){
    console.log(data.toString());
  });
});