'use strict';

var Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    rimraf = require('rimraf'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    config = require('../config/config'),
    filepath = config.filesLoc,
    deploypath = config.deployLoc,
    resumable = require('./resumable.js')(filepath);

/*
 * Retrieve all images
 */
exports.getAll = function(req, res, next){
  Image.find({}, function(err, images){
    if (err) return res.json('400', err);
    res.json('200', images);
  });
};

/*
 * Create an image
 */
exports.create = function(req, res, next){
  var image = new Image(req.body);
  image.save(function(err){
    if (err) return res.json('400', err);
    res.send(200);
  });
};

/*
 * Delete an image
 */
exports.delete = function(req, res, next){
  var id = req.params.id;
  Image.findByIdAndRemove(id, function(err, image){
    var promises = [];

    image.files.forEach(function(file, i){
      var deferred = Q.defer();
      resumable.clean(file.identifier, {
        onDone: function(){
          deferred.resolve();
        }
      });
      promises.push(deferred.promise);
    });

    Q.all(promises).then(function(){
      res.send(200);
    });
  });
};

/*
 * Deploy an image
 */
exports.deploy = function(req, res, next){
  var id = req.params.id;
  Image.findOne({ _id: id }, function(err, image){
    if (err) return res.json(500, err);
    var name = image.name;
    var dir = path.join(deploypath, name);

    fs.mkdir(dir, function(err){
      if (err) return res.json(500, err);

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
          if (err) return res.json(500, err);

          res.send(200);
        });
      });
    });
  });
};

/*
 * Undeploy an images
 */
exports.undeploy = function(req, res, next){
  var id = req.params.id;
  Image.findOne({ _id: id }, function(err, image){
    if (err) return res.json(500, err);

    var name = image.name;
    var dir = path.join(deploypath, name);

    rimraf(dir, function(error){
      if(err) return res.json(500, err);

      Image.findByIdAndUpdate(id, { deployed: false }, function(err, image){
        if (err) return res.json(500, err);

        res.send(200);
      });
    });
  });
};