'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoxSchema = new Schema({
  name: { type: String, unique: true },
  address: String,
  port: Number,
  status: { type: String, default: 'Offline' }
});

mongoose.model('Box', BoxSchema);