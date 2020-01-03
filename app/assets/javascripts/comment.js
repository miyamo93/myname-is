$(document).on('turbolinks:load', function(){
  function buildHTML(comment){
    var html = `<div class="comment__center--box">
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
    console.log(this)
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
    .fail(function(){
      alert('error');
    })
  })
})