(function($) {
  var $bookForm = $('#bookForm');
  var $message = $('#message');

  function handleError(message) {
    // we want to put the message on the form
    $message
      .show()
      .addClass('alert-danger')
      .text(message || 'Welcome to the book store');
  }

  function handleSuccess(message) {
    // we want to put the message on the form
    $message
      .show()
      .addClass('alert-success')
      .text(message);

    window.setTimeout(function() {
      location.pathname = '/admin';
    }, 2000);
  }

  $bookForm.submit(function(event) {
    // stop form from submitting
    event.preventDefault();

    $.ajax({
      url: '/admin/add',
      method: 'post',
      // we send the serialized form data
      data: $(this).serialize(),
      complete: function(data) {
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
