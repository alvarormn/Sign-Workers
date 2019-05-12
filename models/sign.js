'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignSchema = Schema({
  time: Date
  //user: { type: Schema.ObjectID, ref: 'User' }
})

module.exports = mongoose.model('Sign', SignSchema);
