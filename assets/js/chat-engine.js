class chatEngine {
  constructor(userId) {
    this.userId = userId;

    this.socket = io("ws://localhost:3000");

    this.socket.on("connect", function () {
      // console.log("Connection Established using sockets");
    });

    this.socket.on("disconnect", () => {
      // console.log("Socket Disconnected");
    });

    this.socket.emit("login", { userId: this.userId });

    // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // socket.on("hello from server", (...args) => {
    //   console.log(...args);
    // });

    // socket.emit("join_room", {
    //   userId: userId,
    //   chatroom: "codeial",
    // });

    this.socket.on("user_online", function (data) {
      $(`#friends-list #friend-${data.userId} .online-status`).show();
      $(`#chatbox-friend-${data.userId} .online-status`).show();
    });

    this.socket.on("user_offline", function (data) {
      $(`#friends-list #friend-${data.userId} .online-status`).hide();
      $(`#chatbox-friend-${data.userId} .online-status`).hide();
    });

    // this.socket.on("user_joined", function (data) {
    //   console.log("A user joined", data);
    // });

    this.socket.on("received_message", function (data) {
      // console.log("Message Received", data);
      let avatar = `<i class="fas fa-user-circle"></i>`;
      if (data.sender.userAvatar) {
        let avatarSrc = data.sender.userAvatar;
        avatar = `<img src="${avatarSrc}" alt="" />`;
      }
      let messageDom = `<div class="message-item friend-message-item">
                <div class="message-header">
                  <div class="message-user">
                    <div class="display_pic">
                      ${avatar}
                    </div>
                    <div class="display_name">${data.sender.userName}</div>
                  </div>
                </div>
                <div class="message-content">${data.message}</div>
              </div>`;
              
      $(`#modalChatbox #messages-list-${data.chatroom}`).append(messageDom);
      var modalContent = document.querySelector(
        "#modalChatbox .modal-content .messages-list"
      );
      var scrollHeight = modalContent.scrollHeight;
      $(".messages-list").scrollTop(scrollHeight);

      $.ajax({
        url: "/chat/update-read-status",
        type: "post",
        data: { chatroom: data.chatroom, readStatus:"seen" },
        success: function (response) {
          $(`#chats #friends-list #friend-${data.sender.userId} .new-message-status`).hide();
        },
        error: function (err) {
          console.log(err);
        },
      });
    });

    this.socket.on("new_message", function (data) {
      // console.log("New Message", data);
      $(`#chats #friends-list`).prepend($(`#chats #friends-list #friend-${data.sender.userId}`))
      $(`#chats #friends-list #friend-${data.sender.userId} .new-message-status`).show();
    });
  }

  joinRoom(chatroom) {
    this.socket.emit("join_room", { userId: this.userId, chatroom: chatroom });
  }

  leaveRoom(chatroom) {
    this.socket.emit("leave_room", { userId: this.userId, chatroom: chatroom });
  }

  emitPrivateMessage(chatroom, sender, to_user, message) {
    this.socket.emit("send_message", {
      chatroom: chatroom,
      from_user: this.userId,
      sender: sender,
      to_user: to_user,
      message: message,
    });
  }
}
