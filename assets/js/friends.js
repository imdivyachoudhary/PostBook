function openChatBox(ele) {
  $("#modalChatbox .modal-body").html("");
  var friend_id = $(ele).attr("data-id");

  $.ajax({
    url: "/chat/showChatbox",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      // Add response in Modal body
      $("#modalChatbox .modal-body").html(response);
    },
  });
}

function unfriend(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/unfriend",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      
    },
  });
}
