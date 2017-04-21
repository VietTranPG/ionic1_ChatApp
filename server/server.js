var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')().listen(server);
io.on('connection',function(socket){
	console.log('new client has connected!');
	socket.on('Message',function(data){
		console.log(data);
		io.emit("Message",data)
	})
});
	
server.listen(3000,function() {
		console.log('server running in port 3000');
})