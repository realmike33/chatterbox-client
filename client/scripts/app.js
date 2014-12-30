var app = {};

var appendMessage = function(user, msg, room){
 var $messageList = $('#message-list');
 if(room)
 $messageList.append(
  $('<li class="message"></li>')
  .text(user + ': ' + msg)
  )
}

var getData = function(data){
  console.log(data.results);
  $('#message-list').empty();
  data.results.forEach(function(obj){
    var msg = obj.text;
    var user = obj.username;
    var room = obj.roomname;
    if(user && msg && room === localStorage.room){
    appendMessage(user, msg, room);
    }
  })
};

var get = function(){
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      success: getData,
      error: function(err){
        console.log('you got a ' + err + ', bro');
      }
    });
};

$('#choose-room').on('click', function(){
  var roomName = $('.userRoom').val();
  if(roomName){
    localStorage.setItem('room', roomName);
  }
})


var setUserName = function(){
  var userName = prompt("What's your name, son/ daughter?");
  if(!userName){
    userName = 'I Am Lorde, Ya Ya Ya';
  }
  localStorage.setItem('userName', userName)
  localStorage.setItem('room', 'lobby');
}
setUserName();

$(document).ready(function(){
  var hello = $('<h1></h1>').text('welcome '+ localStorage.userName);
  $('#main').prepend(hello);
    setInterval(function(){
      get();
    }, 500)


  $('#send').on('click', function(){
    var user = localStorage.userName;
    var msg = $('.userMsg').val();
    var room = localStorage.room || 'lobby';
    var message = {
      username: user,
      text: msg,
      roomname: room
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){

      },
      error: function(err){
        console.log(err);
      }
    });
    $('.userMsg').val('');
  })

})




