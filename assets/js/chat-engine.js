class chatEngine {
  constructor(chatBoxId, user, friend, chatroom) {
    this.chatBox = $(`#${chatBoxId}`);
    this.user = user;
    this.friend = friend;
    this.chatroom = chatroom;

    this.socket = io.connect("http://localhost:5000");

    if (this.user) {
      this.connectionHandler();
    }

    // this.socket.emit("join_room", {
    //   user_email: this.user.email,
    //   chatroom: this.chatroom,
    // });

    // this.socket.on("user_joined", function (data) {
    //   console.log("A user joined", data);
    // });
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("Connection Established using sockets");

      self.socket.emit("join_room", {
        user_email: self.user.email,
        chatroom: self.chatroom,
      });

      self.socket.on("user_joined", function (data) {
        console.log("A user joined", data);
      });
    });
  }
}
