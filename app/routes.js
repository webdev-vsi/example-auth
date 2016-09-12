var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app, passport) {

    //home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    //login page
    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    //process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true //allow flash messages
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });


    // signup

    //show signup page
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/customers', isLoggedIn, function(req, res){
      connection.query('USE ' + dbconfig.database);

      connection.query('SELECT * FROM customers',function(err,rows)
      {
          if(err)
              console.log("Error Selecting : %s ",err );

             console.log(rows);
          res.render('customers',{page_title:"Customers - Node.js",data:rows});
       });
    });

    //verify if user is logged on

    function isLoggedIn(req, res, next) {
        // if use is authenticated in the sesssion
        if (req.isAuthenticated())
            return next();

        //if not then redirect to home
        res.redirect('/');
    }
};
