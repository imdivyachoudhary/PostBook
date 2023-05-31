const { Server } = require("socket.io");
const userController = require("../controllers/userController");
const users = {};
const socketIds = {};

module.exports.chatSockets = function (socketServer) {
  let io = new Server(socketServer,{
    cors: {
      origin: '*',
    }
  });

  io.sockets.on("connection", function (socket) {
    // console.log("New connection received ", socket.id);
    
    socket.on("disconnect", function () {
      // console.log("Socket Disconnected");
      let userId = users[socket.id];
      delete users[socket.id];
      delete socketIds[userId];
      userController.updateOnlineStatusSocket(userId, false);
      // console.log('User Offline ',userId);

      io.emit("user_offline",{userId: userId});
    });

    // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    
    // socket.on("hello from client", (...args) => {
    //   console.log(...args);
    // });
    socket.on('login', function(data){
      users[socket.id] = data.userId;
      socketIds[data.userId] = socket.id;
      userController.updateOnlineStatusSocket(data.userId, true);
      // console.log('User Online ',data.userId);

      io.emit("user_online",data);
    });

    socket.on("join_room", function (data) {
      // console.log("User joinind Room : ", data);
      
      socket.join(data.chatroom);

      // io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("leave_room", function (data) {
      // console.log("User leaving Room : ", data);
      
      socket.leave(data.chatroom);

      // io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message",function(data){
      // io.in(data.chatroom).emit("received_message",(data));
      receiverSocketId = socketIds[data.to_user];
      socket.broadcast.to(receiverSocketId).emit("new_message",(data));
      socket.broadcast.to(data.chatroom).emit("received_message",(data));
      
    })
  });

};
