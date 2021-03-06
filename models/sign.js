'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignSchema = Schema({
  date: String,
  hour: String,
  completeDate: Date,
  moment: Boolean,
  user: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Sign', SignSchema);
