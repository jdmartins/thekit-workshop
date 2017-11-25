(function($) {
  var $removeBook = $('.removeBook');
  console.log($removeBook);
  //when we click the removeButton
  $removeBook.click(function(ev) {
    //get the id from the book
    var id = $(this).data('id');
    $.ajax({
      url: `/admin/${id}`,
      method: 'delete',
    }).done(function(data) {
      location.reload();
    });
  });
})(jQuery);
