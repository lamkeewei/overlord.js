'use strict';
var Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    rimraf = require('rimraf'),
    config = require('./config/config'),
    filepath = config.filesLoc,
    deploypath = config.deployLoc,
    resumable = require('./controllers/resumable.js')(filepath),
    mongoose = require('mongoose'),
    Box = mongoose.model('Box'),
    BoxCtrl = require('./controllers/boxes.js'),
    Image = mongoose.model('Image');

module.exports = function(io, app){
  // Turn off debug logs
  io.set('log level', 1);

  var notifyChange = function(name, status){
    io.sockets.emit('status-change', { name: name, status: status });
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

  var startRsync = function(){
    var sockets = io.of('/minions').clients();
    sockets.forEach(function(s){
      s.emit('rsync');
    });
  };

  // Sockets bindings for minions
  var minions = io.of('/minions').on('connection', function(socket){
    socket.on('online', function(data){
      socket.set('name', data.name);
      notifyChange(data.name, 'Online');

      Box.findOneAndUpdate({ name: data.name }, { status: 'Online'}, function(err, box){
        console.log(data.name, 'connected');
      });
    });

    socket.on('disconnect', function(){
      socket.get('name', function(err, name){
        Box.findOneAndUpdate({ name: name }, { status: 'Offline' }, function(err, box){
          notifyChange(box.name, 'Offline');
          console.log(box.name, 'disconnected');
        });
      });
    });
  });

  var checkActive = function(){
    var deferred = Q.defer();
    BoxCtrl.getAllActive(function(err, boxes){
      if (boxes.length < 0) {
        deferred.reject();
      }

      deferred.resolve();
    });

    return deferred.promise;
  };

  // Sockets binding for root namespace
  io.sockets.on('connection', function(socket){
    socket.on('run-command', function(data, fn){
      var command = data.command;
      var promises = runCommand(command);
      promises.then(function(results){
        fn(results);
      });
    });

    socket.on('rsync', function(data){
      startRsync();
    });

    socket.on('deploy', function(id, done){
      BoxCtrl.getAllActive(function(err, boxes){
        if(boxes.length === 0) {
          // Have to check and wake all up before proceeding;
          return done({
            code: 0,
            msg: 'No boxes are active now'
          });
        }

        Image.findOne({ _id: id }, function(err, image){
          if (err) return done(err);
          var name = image.name;
          var dir = path.join(deploypath, name);

          fs.mkdir(dir, function(err){
            if (err) return done(err);

            var promises = [];
            image.files.forEach(function(file, i){
              var deferred = Q.defer();

              var stream = fs.createWriteStream(path.join(dir, file.name));
              resumable.write(file.identifier, stream, {
                onDone: function(){
                  deferred.resolve();            
                }
              });

              promises.push(deferred.promise);
            });

            Q.all(promises).then(function(){
              Image.findByIdAndUpdate(id, { deployed: true }, function(err){
                if (err) return done(err);

                done(null, 'success');
              });
            });
          });
        });
      });
    });

    socket.on('undeploy', function(id, done){
      BoxCtrl.getAllActive(function(err, boxes){
        if (boxes.length === 0) {
          return done({
            code: 0,
            msg: 'No boxes are active now'
          });
        }

        Image.findOne({ _id: id }, function(err, image){
          if (err) return done(err);

          var name = image.name;
          var dir = path.join(deploypath, name);

          rimraf(dir, function(error){
            if(err) return done(err);

            Image.findByIdAndUpdate(id, { deployed: false }, function(err, image){
              if (err) return done(err);

              done(null, 'success');
            });
          });
        });
      });
    });
  });
};