var userController=require('../controller/userController.js');
var FacebookTokenStrategy = require('passport-facebook-token');
var passport = require('passport');
var passport = userController.passport;
var fbConfig = require('../config/auth');

/***
* @description Class passport use for user
* @class passport
* @extends {passport}
**/
exports.passport = function(passport) {
 // used to serialize the user for the session
 passport.serializeUser(function(user, done) {

     done(null, user.id);
 });

 // used to deserialize the user
passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
         done(err, user);
     });
 });





 //pull in our app id and secret from our auth.js file
passport.use('facebook-token', new FacebookTokenStrategy(fbConfig.facebookAuth, function(accessToken, refreshToken, profile, done) {

 console.log(accessToken, refreshToken, profile);

   User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
}));
return passport;
}(passport);
