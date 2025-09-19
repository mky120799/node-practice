const express = require("express");
const http = require("http");
const { disconnect } = require("process");
const { Server } = require("socket.io"); // modern way

const app = express();
const server = http.createServer(app);

// initiate socket.io and attach it to the http server
const io = new Server(server);

app.use(express.static("public")); // fixed path

const users = new Set();

io.on("connection", (socket) => {
  console.log("a user is now connected");

  socket.on("join", (userName) => {
    console.log(userName)
    users.add(userName);
    socket.userName = userName; // store username on socket
    io.emit("userJoined", userName);
    io.emit("userList", Array.from(users));
  });
  socket.on('chatMessage', (chatMessage)=>{
    //broadcast the recived message to al connected clients
    io.emit('chatMessage',chatMessage);
  });
  socket.on("disconnect", () => {
    users.forEach((user)=>{ if (user === socket.userName) {
      users.delete(socket.userName);
      users.delete(user);
      io.emit("userLeft", user);

      io.emit("userList", Array.from(users));
    }})
   
  });
 });

const PORT = 3030;
server.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
