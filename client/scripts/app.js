var app = {};

var appendMessage = function(user, msg){
 var $messageList = $('#message-list');
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
    if(user && msg){
    appendMessage(user, msg);
    }
  })
};

var setUserName = function(){
  var userName = prompt("What's your name, son/ daughter?");
  if(!userName){
    userName = 'I Am Lorde, Ya Ya Ya';
  }
  localStorage.setItem('userName', userName)
}
setUserName();

$(document).ready(function(){
  var hello = $('<h1></h1>').text('welcome '+ localStorage.userName);
  $('#main').prepend(hello);
   setInterval(function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      success: getData,
      error: function(err){
        console.log('you got a ' + err + ', bro');
      }
    });
   }, 500)


  $('#send').on('click', function(){
    var user = localStorage.userName;
    var msg = $('.userMsg').val();
    var message = {
      username: user,
      text: msg,
      roomname: "lobby"
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    });
    $('.userMsg').val('');
  })

})




