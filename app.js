'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var sign_routes = require('./routes/sign');

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//configurar cabeceras


//carga de rutas base

app.use('/api', user_routes);
app.use('/sign', sign_routes);


module.exports = app;
