'use strict';

var path = require('path'),
    fs = require('fs'),
    filepath = path.normalize(__dirname + '../../../file'),
    resumable = require('./resumable.js')(filepath);

exports.uploadFile = function(req, res){
  resumable.post(req, function(status, filename, original_filename, identifier){
      console.log('POST', status, original_filename, identifier);
      res.send(200);
  });
};

exports.statusCheck = function(req, res){
  resumable.get(req, function(status, filename, original_filename, identifier){
    console.log('GET', status);
    res.send(status, (status === 'found' ? 200 : 204));
  });
};

exports.downloadFile = function(req, res){
  resumable.write(req.params.identifier, res);
};