'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Clave_Supersecreta'



exports.createTocken = function(user) {
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    dni: user.dni,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };

  return jwt.encode(payload, secret)

}
