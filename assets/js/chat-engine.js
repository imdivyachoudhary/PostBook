var chatEngine = (userId) => {
  const socket = io("ws://localhost:3000");

  socket.on("connect", function () {
    console.log("Connection Established using sockets", userId);
  });

  // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // socket.on("hello from server", (...args) => {
  //   console.log(...args);
  // });

  socket.emit("join_room", {
    userId: userId,
    chatroom: "codeial",
  });

  socket.on("user_joined", function (data) {
    console.log("A user joined", data);
  });
};

// class chatEngine {
//   constructor(chatBoxId, user, friend, chatroom) {
//     this.chatBox = $(`#${chatBoxId}`);
//     this.user = user;
//     this.friend = friend;
//     this.chatroom = chatroom;

//     this.socket = io("http://localhost:3000");

//     this.socket.on("connect", function () {
//       console.log("Connection Established using sockets");
//     });

//     if (this.user) {
//       this.connectionHandler();
//     }
//   }

//   connectionHandler() {
//     let self = this;

//     self.socket.on("connect", function () {
//       console.log("Connection Established using sockets");

//       self.socket.emit("join_room", {
//         user_email: self.user.email,
//         chatroom: self.chatroom,
//       });

//       self.socket.on("user_joined", function (data) {
//         console.log("A user joined", data);
//       });
//     });
//   }
// }
