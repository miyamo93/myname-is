$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    if ( user == id ) {
      if ( message.image ) {
        var html = `<div class="chat-box__me">
                      <div class="message">
                        <div class="message__name">
                          ${message.user_name}
                        </div>
                        <div class="message__text">
                          ${message.content}
                          ${message.image}
                        </div>
                      </div>
                      <div class="timestamp">
                        ${message.date}
                      </div>
                    </div>`
        return html;
      }
      else{
        var html = `<div class="chat-box__me">
                      <div class="message">
                        <div class="message__name">
                          ${message.user_name}
                        </div>
                        <div class="message__text">
                          ${message.content}
                        </div>
                      </div>
                      <div class="timestamp">
                        ${message.date}
                      </div>
                    </div>`
        return html;
      }
    }
    else{
      if ( message.image ) {
      var html = `<div class="chat-box__you">
                    <div class="message">
                      <div class="message__name">
                        ${message.user_name}
                      </div>
                      <div class="message__text">
                        ${message.content}
                        ${message.image}
                      </div>
                    </div>
                    <div class="timestamp">
                      ${message.date}
                    </div>
                  </div>`
      return html;
      }
      else{
        var html = `<div class="chat-box__you">
                      <div class="message">
                        <div class="message__name">
                          ${message.user_name}
                        </div>
                        <div class="message__text">
                          ${message.content}
                        </div>
                      </div>
                      <div class="timestamp">
                        ${message.date}
                      </div>
                    </div>`
        return html;
      }
    }
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
      $('form')[0].reset();
    })
  })
});