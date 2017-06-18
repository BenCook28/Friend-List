//we assign to the express variable the express node framework of the require node module
var express = require('express');
//app is a short substitute for the express framework
var app     = express();
//require grabs https, then makes a server
var http	= require('http').Server(app);

//static doesn't change the css and js files in the public folder
app.use(express.static(__dirname + '/'));
//the express module 
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on Port:3000');
});