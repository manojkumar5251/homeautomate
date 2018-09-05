const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var status = {
	h_l1: 0,
	h_l2: 0,
	h_f1: 0,
	s_l1: 0,
	s_l2: 0,
	s_f1: 0,
	k_l1: 0
};

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connect', socket => {
	console.log('A client just connected on', socket.id);
	console.log(socket);
	

	socket.on('arduino_initial_status', data => {
		status = data;
		console.log('arduino_initial_status recieved', status);
	});

	socket.emit('server_restart');

	socket.on('server_restarted', data => {
		status = data;
		console.log('server_restarted recieved', status);
	});

	socket.emit('initial_status', status, function(res, val) {
		console.log(res, val);
	});

	socket.on('change_status_req', data => {
		status = data;
		console.log('status change request recieved from client', status);
		socket.broadcast.emit('change_status', status);
	});

	socket.on('disconnect', function() {
		console.log('A client just disconnected on', socket.id);
	});
});

server.listen(app.get('port'), () => {
	console.log(app.get('port'));
});
