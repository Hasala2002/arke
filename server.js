// Imports

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const chronos = require('@hasala2002/chronos');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	debug: true,
});

// Utility Functions

function NumClientsInRoom(namespace, room) {
	var clients = io.nsps[namespace].adapter.rooms[room];
	return Object.keys(clients).length;
}

function htmlEncode(str) {
	return String(str).replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
}

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Setting up middlewares

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/peerjs', peerServer);

let rooms = {};

app.get('/', (req, res) => {
	const roomId = uuidv4();
	if (rooms[roomId]) {
		rooms[roomId] += 1;
	} else {
		rooms[roomId] = 1;
	}
	res.redirect(`/${roomId}`);
});

// Client Frontend Initiation

app.get('/:room', (req, res) => {
	const { room } = req.params;
	if (rooms[room] === null || rooms[room] === undefined) {
		return res.send('Error!');
	}
	res.render('room', { roomId: room });
});

// Socket Functions

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId, uname) => {
		uname = escapeHtml(uname);
		socket.join(roomId);
		socket.to(roomId).emit('user-connected', userId, uname);
		io.to(roomId).emit(
			'updatePeerCount',
			io.sockets.adapter.rooms.get(roomId).size
		);
		socket.on('message', (message, userName, uid) => {
			message = escapeHtml(message);
			io.to(roomId).emit(
				'createMessage',
				message,
				chronos.format('hh:mm:cc'),
				userName,
				uid
			);
		});
		socket.on('image', (base64, userName, uid) => {
			io.to(roomId).emit(
				'createImage',
				base64,
				chronos.format('hh:mm:cc'),
				userName,
				uid
			);
		});

		socket.on('disconnect', () => {
			if (rooms[roomId] > 0) rooms[roomId] -= 1;

			socket.to(roomId).emit('user-disconnected', userId, uname);
			io.to(roomId).emit('reduceCount');
		});
	});
});

// Server Start

server.listen(process.env.PORT || 3000);
