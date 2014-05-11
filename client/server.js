'use strict';

var io = require('socket.io-client'),
    socket = io.connect('http://localhost:9000');

socket.on('connect', function(){
  socket.emit('online', { name: 'SIS01' });
});