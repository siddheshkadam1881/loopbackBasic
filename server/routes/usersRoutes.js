/**
* @author siddheshwar kadam
* @version 1.0
**/
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var router = require('express').Router();
var userController=require('../controller/userController.js');
//var userService = require("../service/user.service");
var FacebookTokenStrategy = require('passport-facebook-token');
var passport = require('passport');
var passport = userController.passport;
var secretConfig = require('../config/config');
// var loopback = require('loopback');
// var boot = require('loopback-boot');
// var app = module.exports = loopback();
// var User = app.models.User;
/*
 *  Redirect the user to Facebook for authentication.  When complete,
 *   Facebook will redirect the user back to the application at
 *    /auth/facebook/callback
 *
 *  route for facebook authentication and login
 *   different scopes while logging in
*/

 router.post('/auth/facebook',passport.authenticate('facebook-token', {session: false}),userController.facebookLogin)

  /*
  * token handling middleware
  */
  var authenticate = expressJwt({
    secret: secretConfig.secret,
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

module.exports = router;
