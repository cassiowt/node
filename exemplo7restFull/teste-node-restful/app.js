var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restful = require('node-restful');
var methodOverride = require('method-override');


var index = require('./routes/index');
var users = require('./routes/users');
var Animal = require('./routes/animais');

mongoose.connect('mongodb://localhost/product')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

Animal.register(app, '/animais');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


var Category = app.resource = restful.model('category', mongoose.Schema({
    cat_name: String,
})).methods(['get', 'post', 'put', 'delete']);

Category.register(app, '/category');

var Product = app.resource = restful.model('product', mongoose.Schema({
        prod_name: String,
        prod_desc: String,
        prod_price: Number,
        updated_at: { type: Date, default: Date.now }
})).methods(['get', 'post', 'put', 'delete']);

Product.register(app, '/product');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
