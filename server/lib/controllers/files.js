'use strict';

var mongoose = require('mongoose'),
    File = mongoose.model('File'),
    path = require('path'),
    filepath = path.normalize(__dirname + '../../../file'),
    resumable = require('./resumable.js')(filepath);

/**
 * Create file 
 */
exports.create = function(req, res, next){
  var file = new File(req.body);
  file.save(function(err){
    if (err) return res.json(400, err);

    res.send(200);
  });
};


/**
 * Get all file 
 */
exports.getAllFiles = function(req, res, next){
  File.find({}, function(err, files){
    if (err) return res.send(400, err);

    res.json(200, files);
  });
};

/**
 * Delete file 
 */
 exports.delete = function(req, res, next){
  var id = req.params.id;
  File.findByIdAndRemove(id, function(err, file){
    if (err) return res.send(400, err);
    resumable.clean(file.identifier, {
      onDone: function(){
        res.send(200);
      }
    });    
  });
 };