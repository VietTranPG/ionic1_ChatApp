var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')().listen(server);
server.listen(3000,function() {
		console.log('server running in port 3000');
})