$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="message__name">
                    ${message.user_name}
                  </div>
                  <div class="message__text">
                    ${message.content}
                    ${img}
                  </div>
                </div>
                <div class="timestamp">
                  <%= message.created_at.strftime("%Y/%m/%d %H:%M") %>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: message,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    done(function(data){
      var html = buildHTML(data);
      $('.chat-box').append(html);
      $('#new_message')[0].reset();
      scrollBottom();
      function scrollBottom(){
        var target = $('.chat-box').last();
        var position = target.offset().top + $('.chat-box').scrollTop();
        $('.chat-box').animate({
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