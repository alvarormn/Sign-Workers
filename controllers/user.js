'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req,res){
  res.status(200).send({
    message: 'Prueba 1'
  })
}

function saveUser(req,res){
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.dni = params.dni;

  User.findOne({dni: user.dni}, (err, output) => {
    if (output) {
      res.status(200).send({
        message: 'El usuario ya existe'
      })
    } else {
      if(params.password){
        //Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err,hash){
          user.password = hash;
          if (user.name != null && user.surname != null && user.dni != null) {
            //guardar el usuario
            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({
                  message: 'Error al guardar'
                })
              } else {
                if (!userStored) {
                  res.status(404).send({
                    message: 'No se ha podido guardar'
                  })
                } else {
                  console.log(userStored);
                  res.status(200).send({
                    user: userStored
                  })
                }
              }
            })
          } else {
            res.status(200).send({
              message: 'Rellene todos los datos'
            })
          }
        })
      } else {
        res.status(200).send({
          message: 'Introduzca la contraseña'
        })
      }
    }
  });
}

function loginUser(req,res){
  var params = req.body;

  var dni = params.dni
  var password = params.password;

  User.findOne({dni: dni}, (err, output) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else if (!output) {
      res.status(404).send({
        message: 'El usuario no existe'
      })
    } else {
      //Comprobar password
      bcrypt.compare(password, output.password, function(err, check){
        if (check) {
          //devolver los datos del usuario
          if (params.gethash) {
            //devolver un token con jwt
            res.status(200).send({
              token: jwt.createTocken(output)
            })
          } else {
            res.status(200).send({
              output
            })
          }
        } else {
          res.status(404).send({
            message: 'El usuario no ha podido logearse'
          })
        }
      })
    }
  })

}

module.exports = {
  pruebas,
  saveUser,
  loginUser
}
