'use strict';
var mongoose = require('mongoose'),
    Box = mongoose.model('Box');

module.exports = function(io, app){
  // Turn off debug logs
  io.set('log level', 1);

  // Sockets events
  io.sockets.on('connection', function(socket){
    socket.on('online', function(data){
      socket.set('name', data.name);
      Box.findOneAndUpdate({ name: data.name }, { status: 'Online'}, function(err, box){
        console.log(data.name, 'connected');
      });
    });

    socket.on('disconnect', function(){
      socket.get('name', function(err, name){
        Box.findOneAndUpdate({ name: name }, { status: 'Offline' }, function(err, box){
          console.log(box.name, 'disconnected');
        });
      });
    });
  });

  //Express routes
};