'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: { type: String, required: true },
  files: [{
    name: { type: String, required: true },
    identifier: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Image', ImageSchema);