$(document).ready(function () {
  $("#modalChatbox").on("shown.bs.modal", function () {
    var modalContent = document.querySelector(
      "#modalChatbox .modal-content .messages-list"
    );
    var scrollHeight = modalContent.scrollHeight;
    $(".messages-list").scrollTop(scrollHeight);

    // console.log('Modal scroll height:', scrollHeight);

    // $(".messages-list").animate(
    //   { scrollTop: scrollHeight },
    //   500
    // );
  });

  // $(".messages-list").animate(
  //   { scrollTop: 10 * $(".messages-list").height() },
  //   500
  // );
  let chatroom = $("#modalChatbox #chatroom").attr("value");
  let userId = $("#modalChatbox #from_user").attr("value");
  let friendId = $("#modalChatbox #to_user").attr("value");
  $(`#chats #friends-list #friend-${friendId} .new-message-status`).hide();
  userChatEngine.joinRoom(chatroom);
});

function closeChatBox(userId,chatroom){
  userChatEngine.leaveRoom(chatroom);
  $(".modal").modal("hide");
}
function sendMessage() {
  let chatroom = $("#modalChatbox #chatroom").attr("value");
  let from_user = $("#modalChatbox #from_user").attr("value");
  let to_user = $("#modalChatbox #to_user").attr("value");
  let message = $("#modalChatbox #input-message").val();
  let sender = {userId: $("#modalChatbox #from_user").attr("value"), userName:$("#modalChatbox #userName").attr("value"), userAvatar:$("#modalChatbox #userAvatar").attr("value")};
  // if (message) {
  //   console.log(chatroom);
  //   console.log(sender);
  //   console.log(to_user);
  //   console.log(message);
  //   return;
  // }
  if (!message) {
    return;
  }
  $.ajax({
    url: "/chat/create-message",
    type: "post",
    data: {
      from_user: from_user,
      to_user: to_user,
      message: message,
      chatroom: chatroom,
    },
    success: function (response) {
      //   console.log(response);
      $("#modalChatbox #input-message").val("");
      let messageDom = createmessageDom(response.data, sender);
      $(`#modalChatbox #messages-list-${chatroom}`).append(messageDom);
      var modalContent = document.querySelector(
        "#modalChatbox .modal-content .messages-list"
      );
      var scrollHeight = modalContent.scrollHeight;
      $(".messages-list").scrollTop(scrollHeight);
      userChatEngine.emitPrivateMessage(chatroom, sender, to_user, message);
    },
    error: function (err) {
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
  });
}

function createmessageDom(data, sender) {
  let avatar = `<i class="fas fa-user-circle"></i>`;
  if (sender.userAvatar) {
    let avatarSrc = sender.userAvatar;
    avatar = `<img src="${avatarSrc}" alt="" />`;
  }
  return (dom = `<div class="message-item user-message-item">
                <div class="message-header">
                  <div class="message-user">
                    <div class="display_name">You</div>
                    <div class="display_pic">
                      ${avatar}
                    </div>
                  </div>
                </div>
                <div class="message-content">${data.message}</div>
              </div>`);
}
