'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignSchema = Schema({
  date: Date,
  moment: Boolean,
  user: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Sign', SignSchema);
