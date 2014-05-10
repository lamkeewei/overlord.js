'use strict';

var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    File = mongoose.model('File'),
    config = require('./../config/config.js'),
    filepath = config.filesLoc,
    deploypath = config.deployLoc,
    resumable = require('./resumable.js')(filepath);

try {
  fs.mkdirSync(deploypath);
}catch(e){}

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

/**
 * Deploy file 
 */
exports.deploy = function(req, res, next){
  var id = req.params.id;
  File.findByIdAndUpdate(id, { deployed: true }, function(err, file){
    if (err) return res.json('400', err);
    var stream = fs.createWriteStream(path.join(deploypath, file.name));
    resumable.write(file.identifier, stream, {
      onDone: function(){
        res.send(200);
      }
    });
  });
};

/**
 * Undeploy file 
 */
exports.undeploy = function(req, res, next){
  var id = req.params.id;
  File.findByIdAndUpdate(id, { deployed: false }, function(err, file){
    if (err) return res.json(400, err);

    fs.unlink(path.join(deploypath, file.name), function(){
      res.send(200);
    });
  });
};