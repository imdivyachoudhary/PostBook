function acceptRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/accept-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      
    },
  });
}

function declineRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/decline-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      
    },
  });
}
