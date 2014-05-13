'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoxSchema = new Schema({
  name: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  port: { type: Number, required: true },
  status: { type: String, default: 'Offline' }
});

mongoose.model('Box', BoxSchema);