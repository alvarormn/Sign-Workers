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

  //Sing.findOne({_id: })

  var d = moment().format();
  //console.log(d)
  var dUnix = moment().unix(d);
  //console.log(dUnix);
  var utc = moment(dUnix).utc()
  //console.log(utc);

  sign.date = dUnix;
  sign.moment = 1;
  sign.usuario = idUser;
  console.log(sign)
  sign.save((err,signStored) => {
    if (err) {
      res.status(500).send({
        message: 'Error al guardar - ' + err
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
