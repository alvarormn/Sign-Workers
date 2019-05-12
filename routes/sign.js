'use strict'

var express = require('express');
var SignController = require('../controllers/sign');

var api = express.Router();
var md_Auth = require('../middlewares/authenticated');

api.get('/check', md_Auth.ensureAuth, SignController.setSign);

module.exports = api;
