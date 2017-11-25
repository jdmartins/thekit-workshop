(function($) {
  var $registerForm = $('#registerForm');
  var $message = $('#message');

  function handleError(message) {
    // we want to put the message on the form
    $message
      .show()
      .addClass('alert-danger')
      .text(message);
  }

  function handleSuccess(message) {
    // we want to put the message on the form
    $message
      .show()
      .addClass('alert-success')
      .text(message);

    window.setTimeout(function() {
      location.pathname = '/login';
    }, 2000);
  }

  $registerForm.submit(function(event) {
    // stop form from submitting
    event.preventDefault();
    $.ajax({
      url: '/register',
      method: 'post',
      // we send the serialized form data
      data: $(this).serialize(),
      complete: function(data) {
        const res = data.responseJSON;
        $message
          .hide()
          .removeClass('alert-danger')
          .removeClass('alert-success')
          .html('');

        if (res.error) {
          return handleError(res.message);
        } else {
          return handleSuccess(res.message);
        }
      },
    });
  });
})(jQuery);
