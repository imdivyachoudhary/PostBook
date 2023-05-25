function unsendRequest(ele) {
  var friend_id = $(ele).attr("data-id");
  $.ajax({
    url: "/friendship/unsend-request",
    type: "post",
    data: { friend_id: friend_id },
    success: function (response) {
      
    },
  });
}
