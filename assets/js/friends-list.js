$(document).ready(function () {
  $(".message-icon").click(function () {
    $(".modal-body").html("");
    var friend_id = $(this).attr("data-id");
    // console.log(postid);
    // $(".modal-header h1").html("Comments");

    $.ajax({
      url: "/chat/showChatbox",
      type: "post",
      data: { friend_id: friend_id },
      success: async function (response) {
        // Add response in Modal body
        await $("#modalChatbox .modal-body").html(response);
        
        // $("#chatbox").html(response);
        // $("#chatbox").show();

        // console.log($("#modalChatbox .modal-body").height());
        // $("#modalChatbox .modal-body").animate(
        //   { scrollTop: $("#modalChatbox .modal-body").height() },
        //   500
        // );
        
      },
    });
  });
});
