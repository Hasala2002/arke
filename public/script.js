// const linkifyHtml = require('linkify-html');

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const options = {
  attributes: {
    target: '_blank'
  }
};

const socket = io();
var userName;
var userIdNumber;
var userCount;

var audioEnter = document.getElementById('enterAudio')
var audioSMS = document.getElementById('smsNot')

// $('.emoji-picker-window').hide()

$('#happy').click(()=>{
  $('.emoji-picker-window').toggleClass("show")
  $('.emoji-picker-window').hasClass("show") ? $('#happy ion-icon').attr("name","close") : $('#happy ion-icon').attr("name","happy")
})

// $('#attach').click(()=>{
//   $('.emoji-picker-window').toggleClass("show")
//   $('.emoji-picker-window').hasClass("show") ? $('#happy ion-icon').attr("name","close") : $('#happy ion-icon').attr("name","happy")
// })

setTimeout(()=>{
    $('#splash').hide()
    $('#userName').focus()
},1000)
// $('#userNameForm').hide()
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
    $('.nameplate').text(`@${userName}`)
    $('.current-room-number').text(`${ROOM_ID}`)
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
    if(($('#messageList .chat-messages:last-child').attr('data-id'))===uid){
      return true
    }
    else if(($('#messageList .chat-images:last-child').attr('data-id'))===uid){
      return true
    }
    else{
      return false
    }
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
            $('.chat').scrollTop($('.chat')[0].scrollHeight)
    }else{
      if(checkLastMessage(uid)===false){
        $('#messageList').append(`
        <div class="chat-messages personal" data-id="${uid}">
        <span class="chat-user">You:</span>
        <span class="chat-message">
        ${linkifyHtml(message,options)}
        </span>
        </div>`)}
        else{
          $('#messageList').append(`
          <div class="chat-messages personal w-o-name" data-id="${uid}">
          <span class="chat-message">
          ${linkifyHtml(message,options)}
          </span>
          </div>`)
        }
    }
    $('.chat').scrollTop($('.chat')[0].scrollHeight)
  })


  socket.on('createImage',(base64,name,uid)=>{
    if(uid!==userIdNumber){
    if(checkLastMessage(uid)===false){
      $('#messageList').append(`
      <div class="chat-images" data-id="${uid}">
      <span class="chat-user">${name}:</span>
      <img src="${base64}">
      </div>`)
    }else{
      $('#messageList').append(`
      <div class="chat-images w-o-name" data-id="${uid}">
      <img src="${base64}">
      </div>`)
    }
            audioSMS.play()
            $('.chat').scrollTop($('.chat')[0].scrollHeight)
    }else{
      if(checkLastMessage(uid)===false){
        $('#messageList').append(`
        <div class="chat-images personal" data-id="${uid}">
        <span class="chat-user">You:</span>
        <img src="${base64}">
        </div>`)}
        else{
          $('#messageList').append(`
          <div class="chat-images personal w-o-name" data-id="${uid}">
          <img src="${base64}">
          </div>`)
        }
    }
    $('.chat').scrollTop($('.chat')[0].scrollHeight)
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

$(text).keypress(function (e) {
  if(e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      if(text.val().length !== 0){
        socket.emit('message',text.val(),userName,userIdNumber)
        text.val('')
      }
  }
});

$('#userName').keypress(function (e) {
  if(e.which === 13 && !e.shiftKey) {
  if(($('#userName').val()).length>0){
    userName = $('#userName').val()
    $('#userNameForm').hide()
    userHasSumbmittedName(userName)
    }
  }
});

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

$('.enter-chat').click(()=>{
  $('.arke-welcome').toggleClass('close')
})

$('.menu-button').click(()=>{
  $('.arke-welcome').toggleClass('close')
})

document.querySelector('emoji-picker')
  .addEventListener('emoji-click', event => {
    $(text).val(text.val()+event.detail.unicode)
  });

var typeNumber = 0;
var errorCorrectionLevel = 'M';
var qr = qrcode(typeNumber, errorCorrectionLevel);
qr.addData(`${window.location.href}`);
qr.make();
document.getElementById('placeHolder').innerHTML = qr.createImgTag();

const optionsForCompression = {
  maxSizeMB: 0.7,
  useWebWorker: true
}

document.getElementById('imageInput').addEventListener('change', async function() {
  const reader = new FileReader();
  reader.onload = async function() {
    const base64 = this.result;
    // socket.emit('image', base64);
    $("#img-prvw").attr('src',`${base64}`)
    $(".image-send-confirm-modal").addClass("show")
  };
  reader.readAsDataURL(this.files[0]);
  $('.img-compress-loader').hide()
})

$(".image-send-cancel").click(function(){
  $(".image-send-confirm-modal").removeClass("show")
})

$(".img-send-btn").click(async function(){
  $('.img-compress-loader').show()
  $("#imageInput").prop("disabled",true)
  $(".attach-button").addClass("block")
  $("")
  let images = document.getElementById("imageInput")
  const reader = new FileReader();
  const compressedFile = await imageCompression(images.files[0], optionsForCompression);
  reader.readAsDataURL(compressedFile)
  reader.onloadend = function() {
    var base64data = reader.result;                
    socket.emit('image',base64data,userName,userIdNumber)
  }
  $(".image-send-confirm-modal").removeClass("show")
  $("#imageInput").prop("disabled",false)
  $('.img-compress-loader').hide()
  $(".attach-button").removeClass("block")
})