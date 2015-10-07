var express = require('express');
var https = require('https');
var OAuth   = require('oauth-1.0a');
var queryString = require('query-string');

var port = 8000;
var host = '127.0.0.1';
var publicKey = process.env.SPLITWISE_PUBLIC_KEY;
var secretKey = process.env.SPLITWISE_SECRET_KEY;


var app = express();

app.use(express.static('application'));

app.get('/get_authentication_token',function(request,response){
	
	var config = {
            url: 'https://secure.splitwise.com/api/v3.0/get_request_token',
            method: 'POST',
            data: {}
        };


    var oauth = OAuth({
            consumer: {
                public: publicKey,
                secret: secretKey
            },
            signature_method: 'HMAC-SHA1'
        });

    var oauthHeaderObject = oauth.toHeader(oauth.authorize(config));

    var httpOpts = {
    	host : 'secure.splitwise.com',
    	path:'/api/v3.0/get_request_token',
    	method : config.method,
    	headers : oauthHeaderObject
    };
    
    var httpRequest = https.request(httpOpts , function(httpResponse){
    	var data = '';
    	
    	httpResponse.on('data',function(chunk){
    		
    		data += chunk;
    	});

    	httpResponse.on('end',function(){
    		var obj = queryString.parse(data);
    		response.json(obj);
    	});
    });


    httpRequest.end();
    

});


app.listen(port,host,function(){
	console.log("Server started at %s:%s",host,port);
})