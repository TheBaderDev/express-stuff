var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];
var turn = false;

server.listen(2000);
console.log("Servers running");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	socket.on('updateBoard', function(data) {
		//console.log(data.num);

		for(var i = 0; i < connections.length; i++){
			connections[i].emit('updateBoard', {
				num:data.num,
				val:turn
			});
		}
		turn = !turn;
	});

	//disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});
});
