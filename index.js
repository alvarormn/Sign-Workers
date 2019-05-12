'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/singworkers',
  { useNewUrlParser: true },
  (err,res) => {
    if (err) {
      throw err;
    }else{
      console.log('La BBDD esta funcionando correctamente');
      app.listen(port, function(){
        console.log("Servidor escuchando en http://localhost:" + port);
      })
    }
});
