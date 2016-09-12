var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(customers){

  customers.list = function(req, res){

    connection.query('SELECT * FROM customer',function(err,rows, fields){
      if (err) throw err;
      res.render('customers' , {data:rows});
      });
  };
};
