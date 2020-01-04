$(document).on('turbolinks:load', function(){
  function buildHTML(comment){
    var html = `<div class="comment__center--box"data-tweet-id=${comment.id}>
                  <div class="comment__center--box__name">
                    ${comment.user_name}
                  </div>
                  <div class="comment__center--boxx__text">
                    ${comment.text}
                  </div>
                </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
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
      $('.comment__center').append(html);
      $('.comment-text').val('');
      $('#comment-btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_comment_id = $('.comment__center--box:last').data("comment-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/tweets",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_comment_id}
    })
    .done(function(comments) {
      if (comment.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(comments, function(i, comment) {
          insertHTML += buildHTML(comment)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.comment__center').append(insertHTML);
        $('#new_comment')[0].reset();
        $('#comment-btn').prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error')
    });
  };
    setInterval(reloadMessages, 7000);
});
