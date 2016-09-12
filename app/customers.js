
exports.list = function(req, res){

  req.getConnection(function(err,connection){
    connection.query('USE ' + dbconfig.database);
        var query = connection.query('SELECT * FROM customers',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('customers',{page_title:"Customers - Node.js",data:rows});


         });

         //console.log(query.sql);
    });

};
