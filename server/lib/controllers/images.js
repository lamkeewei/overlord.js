'use strict';

var mongoose = require('mongoose'),
    Image = mongoose.model('Image');

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