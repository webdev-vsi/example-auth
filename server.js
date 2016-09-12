// set-up
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 9000;

var passport = require('passport');
var flash = require('connect-flash');

//var customers  = require('./app/customers');
// configuration
// connect to our database

//var customers = require('./app/customers');
require('./config/passport')(passport);

//set up express application

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

//require passport

app.use(session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: true
})); //session secret

app.use(passport.initialize());
app.use(passport.session()); // persisten login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./app/routes.js')(app, passport); // load routes


//launch

app.listen(port);
console.log('App started on port: ' + port);
