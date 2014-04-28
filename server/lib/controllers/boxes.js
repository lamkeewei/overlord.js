'use strict';

var mongoose = require('mongoose'),
    Box = mongoose.model('Box'),
    passport = require('passport');

/**
 * Create box 
 */
exports.create = function(req, res, next){
  var box = new Box(req.body);
  box.save(function(err){
    if (err) return res.json(400, err);

    res.send(200);
  });
};

/**
 * Update box 
 */
exports.update = function(req, res, next){
  var newBox = new Box(req.body);

  Box.findOne({ _id: newBox.id }, function(err, box){
    if (err) return res.json(400, err);

    box.name = newBox.name;
    box.location = newBox.location;
    box.port = newBox.port;
    box.status = newBox.status; 

    box.save(function(err){
      if (err) return res.json(400, err);

      res.send(200);
    });
  });
};

/**
 * Get all boxes 
 */
exports.getAll = function(req, res, next){
  Box.find({}, function(err, allBox){
    if (err) return res.send(400, err);
    res.json(200, allBox);
  });
};

/**
 * Find one box
 */
exports.getOne = function(req, res, next){
  var name = req.params.name;

  Box.findOne({ name: name }, function(err, box){
    if (err) return next(err);
    if (!box) return res.send(404);

    res.json(box);
  });
};