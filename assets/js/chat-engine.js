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
      // console.log("A user joined", data);
      $(`#friends-list #friend-${data.userId} .online-status`).show();
    });

    this.socket.on("user_offline", function (data) {
      // console.log("A user joined", data);
      $(`#friends-list #friend-${data.userId} .online-status`).hide();
    });
  }
}