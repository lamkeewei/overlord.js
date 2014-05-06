'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileSchema = new Schema({
  name: { type: 'String', required: true },
  identifier: { type: 'String', required: true }
});

module.exports = mongoose.model('File', FileSchema);