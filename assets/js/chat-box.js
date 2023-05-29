$(document).ready(function () {
  
  $('#modalChatbox').on('shown.bs.modal', function () {
    var modalContent = document.querySelector('#modalChatbox .modal-content .messages-list');
    var scrollHeight = modalContent.scrollHeight;
    // console.log('Modal scroll height:', scrollHeight);
    
    // $(".messages-list").animate(
    //   { scrollTop: scrollHeight },
    //   500
    // );
    $(".messages-list").scrollTop(scrollHeight);

  });

  // $(".messages-list").animate(
  //   { scrollTop: 10 * $(".messages-list").height() },
  //   500
  // );

});

