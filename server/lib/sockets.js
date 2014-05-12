'use strict';
var Q = require('q'),
    mongoose = require('mongoose'),
    Box = mongoose.model('Box');

module.exports = function(io, app){
  // Turn off debug logs
  io.set('log level', 1);

  var notifyChange = function(name){
    io.sockets.emit('status-change', { name: name, status: 'Online' });
  };

  var runCommand = function(cmd, fn){
    var sockets = io.of('/minions').clients();
    var promises = [];

    sockets.forEach(function(s){
      var deferred = Q.defer();
      
      s.emit('run-command', { command: cmd }, function(data){
        s.get('name', function(err, name){
          var res = { 
            name: name,
            code: data.code,
            reply: data.reply
          };
          deferred.resolve(res);
        });
      });

      promises.push(deferred.promise);
    });

    return Q.all(promises);
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
    socket.on('run-command', function(data, fn){
      var command = data.command;
      var promises = runCommand(command);
      promises.then(function(results){
        fn(results);
      });
    });
  });
};