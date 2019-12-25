// $(document).on('turbolinks:load', function(){
//   function buildHTML(message){
//     var img = message.image ? `<img src= ${ message.image }>` : "";
//     var html = `<div class="message">
//                   <div class="message__name">
//                     ${message.user_name}
//                   </div>
//                   <div class="message__text">
//                     ${message.content}
//                     ${img}
//                   </div>
//                 </div>
//                 <div class="timestamp">
//                   ${message.date}
//                 </div>`
//     return html;
//   }
//   $('#new_message').on('#message-btn', function(e){
//     e.preventDefault()
//     console.log('saljk')
//     var formData = new FormData(this);
//     var url = $(this).attr('action')
//     $.ajax({
//       url: url,  //同期通信でいう『パス』
//       type: 'POST',  //同期通信でいう『HTTPメソッド』
//       data: message,  
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     done(function(data){
//       var html = buildHTML(data);
//       $('.chat-box').append(html);
//       $('#new_message')[0].reset();
//       scrollBottom();
//       function scrollBottom(){
//         var target = $('.chat-box').last();
//         var position = target.offset().top + $('.chat-box').scrollTop();
//         $('.chat-box').animate({
//           scrollTop: position
//         }, 300, 'swing');
//       }
//     })
//     .fail(function(data){
//       alert('エラーが発生したためメッセージは送信できませんでした。');
//     })
//     .always(function(data){
//       $('#message-btn').prop('disabled', false);//ここで解除している
//     })
//   })
//   setInterval(reloadMessages, 5000);
// })
$(document).on('turbolinks:load', function(){
  function buildHTML(message){
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="chat-box__me">
                    <div class="message" data-message-id=${message.id}>
                      <div class="message__name">
                        ${message.user_name}
                      </div>
                      <div class="message__text">
                        ${message.content}
                        ${img}
                      </div>
                    </div>
                    <div class="timestamp">
                      ${message.date}
                    </div>
                  </div>`
      return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-box').append(html);      
      $('#new_message')[0].reset();
      $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
      $('#message-btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-box').append(insertHTML);
        $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('#message-btn').prop("disabled", false);
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');//ダメだったらアラートを出す
    });
  };

  setInterval(reloadMessages, 5000);
});