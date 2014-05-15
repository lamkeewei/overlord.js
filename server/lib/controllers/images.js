'use strict';

var Q = require('q'),
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