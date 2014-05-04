'use strict';

var resumable = require('./resumable.js')('/tmp/resumable.js/');

exports.uploadFile = function(req, res){
  console.log(req.body);
  resumable.post(req, function(status, filename, original_filename, identifier){
      console.log('POST', status, original_filename, identifier);

      res.send(status, {
          // NOTE: Uncomment this funciton to enable cross-domain request.
          //'Access-Control-Allow-Origin': '*'
      });
  });
};

exports.statusCheck = function(req, res){
  resumable.get(req, function(status, filename, original_filename, identifier){
    console.log('GET', status);
    res.send(status, (status === 'found' ? 200 : 404));
  });
};