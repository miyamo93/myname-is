$(document).on('turbolinks:load', function () {
  $('#tweet_image').on('change', function (e) {
    var preview = $(`<img id="postpreview"/>`)
    var reader = new FileReader();
    reader.onload = function (e) {
      $(preview).attr('src', e.target.result);
      $('.post-form__image--preview').append(preview);
      $('.signup-body__image--box').remove()
    }
    reader.readAsDataURL(e.target.files[0]);
  });
});