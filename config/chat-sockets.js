module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", function (socket) {
    console.log("New connection received ", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });
    
    socket.on("join_room", function (data) {
      console.log("Joining request record ", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
  });
};
