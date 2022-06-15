// Imports

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4: uuidv4 } = require('uuid')
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server,{
    debug: true
})

// Utility Functions

function NumClientsInRoom(namespace, room) {
  var clients = io.nsps[namespace].adapter.rooms[room];
  return Object.keys(clients).length;
}

function htmlEncode(str){
  return String(str).replace(/[^\w. ]/gi, function(c){
      return '&#'+c.charCodeAt(0)+';';
  });
}

function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

// Setting up middlewares

app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/peerjs',peerServer)

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

// Client Frontend Initiation

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

// Socket Functions

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId, uname) => {
    uname = escapeHtml(uname)
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId, uname);
    io.to(roomId).emit('updatePeerCount',((io.sockets.adapter.rooms).get(roomId)).size)
    socket.on('message', (message,userName,uid) => {
      message = escapeHtml(message)
      io.to(roomId).emit('createMessage', message,userName,uid)
    }); 
    socket.on('image', (base64,userName,uid) => {
      io.to(roomId).emit('createImage', base64,userName,uid)
    }); 

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId, uname)
      io.to(roomId).emit('reduceCount')
    })
  })
})


// Server Start

server.listen(process.env.PORT||3000)