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

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  // console.log(server._clients)
  socket.on('join-room', (roomId, userId, uname) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId, uname);
    // messages
    // console.log((io.sockets.adapter.sids).size)
    io.to(roomId).emit('updatePeerCount',(io.sockets.adapter.sids).size)
    socket.on('message', (message,userName,uid) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message,userName,uid)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId, uname)
      // console.log((io.sockets.adapter.sids).size)
      io.to(roomId).emit('updatePeerCount',(io.sockets.adapter.sids).size)
    })
  })
})


server.listen(process.env.PORT||3000)