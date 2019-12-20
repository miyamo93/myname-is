$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}"> 
                <div class="message__up-info">
                <p class="message__up-info--taker">
                  ${message.user_name}
                </p>
                <p class="message__up-info--date">
                  ${message.date}
                </p>
                </div>
                <p class="message__text">
                  ${message.content}
                </p>
                  ${img}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: 取得したリクエストURL,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: message,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scrollBottom();
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('#message-btn').prop('disabled', false);//ここで解除している
    })
  })
})