'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FileSchema = require('./file.js');

var ImageSchema = new Schema({
  name: { type: String, required: true },
  files: [ FileSchema ]
});

ImageSchema
  .path('files')
  .validate(function(files){
    return files.length > 0;
  }, 'There must at least be one file!');

module.exports = mongoose.model('Image', ImageSchema);