'use strict'

var Sign = require('../models/sign');
var User = require('../models/user');
var moment = require('moment');
moment.locale('es');

function setSign(req,res) {
  var sign = new Sign();
  var user = new User();
  var params = req.body;
  //var user = req.user;
  console.log(params)

  User.findOne({dni: req.user.dni}, (err, findUser) => {

    var d = moment().format('L');
    var h = moment().format('LTS');

    sign.date = d;
    sign.hour = h;
    sign.completeDate = moment().format();
    sign.user = findUser._id;
    //console.log(sign)

    //sign.moment = 1; -> Entrada
    //sign.moment = 0; -> Salida
    Sign.find({date: d}, (err, findSign) => {

      if (findSign) {
        console.log(findSign.length)
        console.log(findSign)
      }

      if (err) {
        res.status(500).send({
          message: 'Error - ' + err
        })
      } else if(findSign.length === 0){
        console.log("Entrada de: " + findUser.name);
        sign.moment = 1;
        saveSing();
      } else if(findSign.length > 1) {
        res.status(200).send({
          sign: 'El usuario ' + findUser.name + ' ya realizó la salida hoy ' + d
        })
      } else {
        console.log("Salida de: " + findUser.name);
        sign.moment = 0;
        saveSing();
      }

    })

    function saveSing() {
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



  });

}

module.exports = {
  setSign
}
