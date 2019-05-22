'use strict'

var Sign = require('../models/sign');
var User = require('../models/user');
var moment = require('moment');

function setSign(req,res) {
  var sign = new Sign();
  var user = new User();
  var params = req.body;
  //var user = req.user;

  User.findOne({dni: req.user.dni}, (err, output) => {

    var d = moment().format('L');
    var h = moment().format('LTS');

    sign.date = d;
    sign.hour = h;

    sign.moment = 1;
    sign.user = output._id;
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

  });

}

module.exports = {
  setSign
}
