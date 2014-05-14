'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileSchema = new Schema({
  name: { type: 'String', required: true },
  identifier: { type: 'String', required: true },
  deployed : { type: 'Boolean', default: false }
});

mongoose.model('File', FileSchema);
module.exports = FileSchema;