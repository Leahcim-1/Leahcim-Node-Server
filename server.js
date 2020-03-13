var express = require('express');
var routers = require('./routers/routers')
var app = express();

 app.use('/static', express.static('static'));
 app.use(routers)
 

var server = app.listen(20000, function ( ) {
    var host = server.address().address
    var port = server.address().port
    

    console.log(` The server is now running at ${host}:${port} `)
})