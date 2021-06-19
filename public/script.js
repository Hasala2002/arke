const socket = io('/')
var userName;

setTimeout(()=>{
    $('#splash').hide()
},4000)

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443',
    // secure: 'true'
})

peer.on('open',id=>{
    userName = id
    socket.emit('join-room',ROOM_ID, id)
})

socket.on('user-connected',(userId)=>{
    // connectToNewUser(userId,stream)
    // myFunction(userId)
    // userName = userId
})


socket.on('createMessage',(message,name)=>{
    $('#messageList').append(`
    <div class="chat-messages">
                <span class="chat-user">${name}:</span>
                <span class="chat-message">
                ${message}
                </span>
            </div>`)
    // scrollToBottom()
  })
 
let text = $('#messageBox')

$( "#send" ).click(function() {
    if(text.val().length !== 0){
        socket.emit('message',text.val(),userName)
        text.val('')
      }
  });

$('#userNameBtn').click(()=>{
    if(($('#userName').val()).length>0){
    userName = $('#userName').val()
    $('#userNameForm').hide()
    }
})