//passport Strategy purpose
//var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('../config/auth');
var  passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
//var fbConfig = require('../config/auth');


/***
* @description Class signInWithFacebook use for login fb user
* @class signInWithFacebook
* @extends {req, res}
**/

exports.facebookLogin = function (req,res) {
//console.log("hii");
 console.log(req.user);
  var user = req.user;
  if (user) {
      var token = userService.generateJwt({ email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id});
      res.setHeader('x-auth-token', token);
      res.json({ token : token });
  }else {
    res.json({ err : "No valid user" });
  }
}



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
