'use strict';

module.exports = function(io){
  io.set('log level', 1);
  io.sockets.on('connection', function(socket){
    console.log('connected:', socket.id);
  });
};