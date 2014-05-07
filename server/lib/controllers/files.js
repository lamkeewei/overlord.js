'use strict';

var mongoose = require('mongoose'),
    File = mongoose.model('File');


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

exports.getAllFiles = function(req, res, next){
  File.find({}, function(err, files){
    if (err) return res.send(400, err);

    res.json(200, files);
  });
};