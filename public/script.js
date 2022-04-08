const socket = io();
var userName;
var userIdNumber;
var userCount;

var audioEnter = document.getElementById('enterAudio')
var audioSMS = document.getElementById('smsNot')

setTimeout(()=>{
    $('#splash').hide()
},4000)

// console.log(window.location.href)

const userHasSumbmittedName = () => {
    const peer = new Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: window.location.origin==='https://arkechat.herokuapp.com'?'443':'3000',
        // secure: 'true'
    })
    peer.on('open',id=>{
        userIdNumber = id
        socket.emit('join-room',ROOM_ID, id, userName)
    })
}

socket.on('user-connected',(userId,uName)=>{
    snackbarJoin(uName)
    audioEnter.play()
})

socket.on('user-disconnected', (userId,uName) => {
    snackbarLeave(uName)
    audioEnter.play()
  })

const checkLastMessage = (uid) =>{
  if($('#messageList').html()!==''){
    return ($('#messageList .chat-messages:last-child').attr('data-id'))===uid
  }else{return false}
}


socket.on('createMessage',(message,name,uid)=>{
    if(uid!==userIdNumber){
    if(checkLastMessage(uid)===false){
      $('#messageList').append(`
      <div class="chat-messages" data-id="${uid}">
      <span class="chat-user">${name}:</span>
      <span class="chat-message">
      ${message}
      </span>
      </div>`)
    }else{
      $('#messageList').append(`
      <div class="chat-messages w-o-name" data-id="${uid}">
      <span class="chat-message">
      ${message}
      </span>
      </div>`)
    }
            audioSMS.play()
    }else{
      if(checkLastMessage(uid)===false){
        $('#messageList').append(`
        <div class="chat-messages personal" data-id="${uid}">
        <span class="chat-user">${name}:</span>
        <span class="chat-message">
        ${message}
        </span>
        </div>`)}
        else{
          $('#messageList').append(`
          <div class="chat-messages personal w-o-name" data-id="${uid}">
          <span class="chat-message">
          ${message}
          </span>
          </div>`)
        }
    }
  })

  socket.on('updatePeerCount',(peerCount)=>{
      $('#userCount').text(peerCount)
      userCount = peerCount
  })
 
  socket.on('reduceCount',()=>{
    userCount--
    $('#userCount').text(userCount)
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
    el.value = `Join my private Arkē Disposable Chatroom here
${window.location.href}

Create your own chatroom by visiting ${window.location.origin}`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    snackbarUrl('Invite Link Copied!')
})