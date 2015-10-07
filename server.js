var express = require('express');

var port = 8000;
var host = 127.0.01;
var app = express();

express.use(express.static('application'));


app.listen(port,host,function(){
	console.log("Server started at %s:%s",host,port);
})