var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE ' + dbconfig.database);

connection.query('CREATE DATABASE ' + dbconfig.database);


connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.customers_table + '` (\
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
  `name` varchar(200) NOT NULL,\
  `address` text NOT NULL,\
  `email` varchar(200) NOT NULL,\
  `phone` varchar(20) NOT NULL,\
  PRIMARY KEY (`id`)\
) ');

//..some more db creates

console.log('Success: Database Created!');

connection.end();
