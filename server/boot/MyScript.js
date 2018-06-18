// /******************************************************************************
// *  Purpose         : Rest api of user facebook Login..
// *
// *  @description
// *
// *  @file           : MyScript.js
// *  @overview       : rest api of note write here..
// *  @author         : siddheshwar kadam
// *  @version        : 1.0
// *  @since          : 14-6-2018
// *******************************************************************************/
//
//       var app = require('../../server/server'); //require `server.js` as in any node.js app
//       var FacebookStrategy = require('passport-facebook').Strategy;
//       var FacebookTokenStrategy = require('passport-facebook-token');
//       var fbConfig = require('../config/auth');
//       var  passport = require('passport');
//
//
//       module.exports = function(app) {
//       //app is injected by loopback
//        var User = app.models.User;
//
//         console.log(User);
//
//        /***
//        * @description Class passport use for user
//        * @class passport
//        * @extends {passport}
//        ***/
//
//       exports.passport = function(passport) {
//       // used to serialize the user for the session
//       passport.serializeUser(function(user, done)
//        {
//                 done(null, user.id);
//         });
//         // used to deserialize the user
//        passport.deserializeUser(function(id, done) {
//        User.findById(id, function(err, user) {
//         done(err, user);
//         });
//       });
//
//       //pull in our app id and secret from our auth.js file
//       passport.use('facebook-token', new FacebookTokenStrategy(fbConfig.facebookAuth, function(accessToken, refreshToken, profile, done) {
//       //console.log(" show access token with profile",accessToken, refreshToken, profile);
//        User.findOne(accessToken, refreshToken, profile, function(err, user) {
//            if (err) { return done(err); }
//            console.log(user);
//            return done(serr, user);
//         });
//       }));
//        return passport;
//       }(passport);
//
//
//     //console.log(passport.authenticate);
//      app.post('/api/auth/facebook',passport.authenticate('facebook-token', {session: false}),
//      function (req,res) {
//      console.log(req)
//       //console.log(req.user);
//        var user = req.user;
//        if (user) {
//            var token = userService.generateJwt({ email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id});
//            console.log(token);
//            res.setHeader('x-auth-token', token);
//            res.json({ token : token });
//        }else {
//          res.json({ err : "No valid user" });
//        }
//      })
//   //...
// };
