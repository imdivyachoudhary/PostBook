function sendRequest(ele){
    var friend_id = $(ele).attr("data-id");
    $.ajax({
      url: "/friendship/send-request",
      type: "post",
      data: { friend_id: friend_id },
      success: function (response) {
        
      },
    });
  }