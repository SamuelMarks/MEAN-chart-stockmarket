var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var async = require('async');
var moment = require('moment');
var MongoStore = require('connect-mongo')(session);

var app = express();

if (app.get('env') !== 'production') {

  // expose node_modules to client app
  app.use(express.static(__dirname + "/node_modules"));
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));

mongoose.connect('mongodb://admin:admin@ds019806.mlab.com:19806/fcc-chart-stock-market'); // Connect to MongoDB database for polling app.  

// Make sure mongod is running! If not, log an error and exit. 

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(session({ 
  secret: 'my_precious_l@3', 
  cookie: { maxAge: 600000 }, // 1 hour session
  saveUninitialized: false, // don't create session until something stored 
  resave: false, //don't save session if unmodified     
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));   
  
var stocks = require('./routes/stocks');  

app.use('/api/stocks', stocks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
