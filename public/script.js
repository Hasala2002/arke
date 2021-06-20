const socket = io('/')
var userName;
var userIdNumber;

setTimeout(()=>{
    $('#splash').hide()
},4000)

console.log(window.location.href)

const userHasSumbmittedName = () => {
    const peer = new Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '443',
        // secure: 'true'
    })
    peer.on('open',id=>{
        userIdNumber = id
        socket.emit('join-room',ROOM_ID, id, userName)
    })
}

socket.on('user-connected',(userId,uName)=>{
    snackbarJoin(uName)
})

socket.on('user-disconnected', (userId,uName) => {
    snackbarLeave(uName)
  })


socket.on('createMessage',(message,name,uid)=>{
    if(uid!==userIdNumber){
    $('#messageList').append(`
    <div class="chat-messages">
                <span class="chat-user">${name}:</span>
                <span class="chat-message">
                ${message}
                </span>
            </div>`)
    }else{
        $('#messageList').append(`
        <div class="chat-messages-personal">
                    <span class="chat-user">${name}:</span>
                    <span class="chat-message">
                    ${message}
                    </span>
                </div>`)
    }
    // scrollToBottom()
  })

  socket.on('updatePeerCount',(peerCount)=>{
      $('#userCount').text(peerCount)
  })
 
let text = $('#messageBox')

$( "#send" ).click(function() {
    if(text.val().length !== 0){
        socket.emit('message',text.val(),userName,userIdNumber)
        text.val('')
      }
  });

$('#userNameBtn').click(()=>{
    if(($('#userName').val()).length>0){
    userName = $('#userName').val()
    $('#userNameForm').hide()
    userHasSumbmittedName(userName)
    }
})

function snackbarJoin(uname) {
    var x = document.getElementById("snackbar");
    $('#snackbar').text(`${uname} joined the room`)
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

function snackbarLeave(uname) {
    var x = document.getElementById("snackbar");
    $('#snackbar').text(`${uname} left the room`)
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

function snackbarUrl(text) {
  var x = document.getElementById("snackbar");
  $('#snackbar').text(text)
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}  

$('#inviteUrlCopy').click(()=>{
    const el = document.createElement('textarea');
    el.value = window.location.href;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    snackbarUrl('Invite Link Copied!')
})