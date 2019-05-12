'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var SignController = require('../controllers/sign');

var api = express.Router();
var md_Auth = require('../middlewares/authenticated')

api.get('/probando-controlador', md_Auth.ensureAuth, UserController.pruebas);
api.post('/register',UserController.saveUser);
api.get('/login',UserController.loginUser);

api.get('/sign', md_Auth.ensureAuth, SignController.setSign);

module.exports = api;
