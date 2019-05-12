'use strict'

var Sign = require('../models/sign');
var User = require('../models/user');
var moment = require('moment');

function setSign(req,res) {
  var sign = new Sign();
  var user = new User();
  var params = req.body;
  //var user = req.user;
  var idUser;

  User.findOne({dni: req.user.dni}, (err, output) => {
    idUser = output._id;
    console.log(idUser);
  });

  //sign.time = params.time;
  sign.time = moment().unix();
  sign.user = idUser;

  sign.save((err,signStored) => {
    if (err) {
      res.status(500).send({
        message: 'Error al guardar'
      })
    } else {
      if (!signStored) {
        res.status(404).send({
          message: 'No se ha podido guardar'
        })
      } else {
        res.status(200).send({
          sign: signStored
        })
      }
    }
  })

}

module.exports = {
  setSign
}
