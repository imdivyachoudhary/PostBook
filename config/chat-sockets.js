const { Server } = require("socket.io");

module.exports.chatSockets = function (socketServer) {
  let io = new Server(socketServer,{
    cors: {
      origin: '*',
    }
  });

  io.sockets.on("connection", function (socket) {
    console.log("New connection received ", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket Disconnected");
    });

    // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    
    // socket.on("hello from client", (...args) => {
    //   console.log(...args);
    // });

    socket.on("join_room", function (data) {
      console.log("Joining request record ", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
  });
};
