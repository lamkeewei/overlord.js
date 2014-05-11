'use strict';
var mongoose = require('mongoose'),
    Box = mongoose.model('Box');

module.exports = function(io, app){
  // Turn off debug logs
  io.set('log level', 1);

  var notifyChange = function(name){
    io.sockets.emit('status-change', { name: name, status: 'Online' });
  };

  var runCommand = function(cmd, fn){
    var sockets = io.of('/minions').clients();

    sockets.forEach(function(s){
      s.emit('run-command', { command: cmd }, function(stdout){
        s.get('name', function(err, name){
          io.sockets.emit('command-reply', { name: name, reply: stdout });
        });
      });
    });
  };

  // Sockets bindings for minions
  var minions = io.of('/minions').on('connection', function(socket){
    socket.on('online', function(data){
      socket.set('name', data.name);
      notifyChange(data.name);

      Box.findOneAndUpdate({ name: data.name }, { status: 'Online'}, function(err, box){
        console.log(data.name, 'connected');
      });
    });

    socket.on('disconnect', function(){
      socket.get('name', function(err, name){
        Box.findOneAndUpdate({ name: name }, { status: 'Offline' }, function(err, box){
          notifyChange(box.name);
          console.log(box.name, 'disconnected');
        });
      });
    });
  });

  // Sockets binding for root namespace
  io.sockets.on('connection', function(socket){
    socket.on('run-command', function(data){
      var command = data.command;
      runCommand(command);
    });
  });
};