const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4: uuidv4 } = require('uuid')
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server,{
    debug: true
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/peerjs',peerServer)

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

function NumClientsInRoom(namespace, room) {
  var clients = io.nsps[namespace].adapter.rooms[room];
  return Object.keys(clients).length;
}

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId, uname) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId, uname);
    // console.log(((io.sockets.adapter.rooms).get(roomId)).size);
    io.to(roomId).emit('updatePeerCount',((io.sockets.adapter.rooms).get(roomId)).size)
    socket.on('message', (message,userName,uid) => {
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


server.listen(process.env.PORT||3000)