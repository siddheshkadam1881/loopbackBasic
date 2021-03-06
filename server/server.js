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
//passport Strategy
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    exposedHeaders : ['x-auth-token']
 }));

app.use('/api',userRoutes);
 //var User = app.models.user
 //console.log(User);

//app.use('/api',userRoutes);
app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});
app.use(function (err,req,res,next) {
    //logger.error(err.stack);
    res.status(500).send( {
    err: 'something blew up'
  });
})



//app.post('/auth/facebook',passport.authenticate('facebook-token', {session: false}),userController.signInWithFacebook);


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
