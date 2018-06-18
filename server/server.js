'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var bodyParser = require('body-parser');
var cors = require('cors');
 var expressJwt = require('express-jwt');
 var  passport = require('passport');
 //var logger=require('./config/logger');
 var userRoutes=require('./routes/usersRoutes.js');
 var expressValidator = require('express-validator');
 app.use(expressValidator());
 var FacebookStrategy = require('passport-facebook').Strategy;
 var FacebookTokenStrategy = require('passport-facebook-token');
 var fbConfig = require('./config/auth');
//passport Strategy
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    exposedHeaders : ['x-auth-token']
 }));

//app.use(loopback.rest());
 app.use(loopback.token({
   cookies: ['foo-auth'],
   headers: ['foo-auth', 'X-Foo-Auth'],
   params: ['foo-auth', 'foo_auth']
 }));

 // app.use(loopback.rest());

 // Expose the `Product` model
 // app.model(Product);
 // app.use(function(req, res, next) {
 //   var app = req.app;
 //   //...
 // });

 //var User=loopback.getModel(app.models.User);
 // Define age property to built-in User Model
 loopback.User.defineProperty('age', { type: Number });
 loopback.User.defineProperty('DOB', { type: Date });
 loopback.User.defineProperty('role', { type: String });




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
      //console.log(accessToken, refreshToken, profile);
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
           return done(err, user);
         });
 }));
 return passport;
 }(passport);

  //console.log(passport.authenticate);
 app.post('/api/auth/facebook',passport.authenticate('facebook-token', {session: false}),
 function (req,res) {
 console.log(req)
  //console.log(req.user);
   var user = req.user;
   if (user) {
       var token = userService.generateJwt({ email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id});
       console.log(token);
       res.setHeader('x-auth-token', token);
       res.json({ token : token });
   }else {
     res.json({ err : "No valid user" });
   }
 })








































app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
