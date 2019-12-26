$(document).on('turbolinks:load', function () {
  $('#user_image').on('change', function (e) {
    var preview = $(`#preview`)
    var reader = new FileReader();
    reader.onload = function (e) {
      $(preview).attr('src', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  });
});