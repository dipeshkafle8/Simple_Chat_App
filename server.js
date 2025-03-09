const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// socket.emit:
// Sends a message to the specific client that initiated the connection.
// It is used when you want to send a message to a single client.

// io.emit:
// Sends a message to all connected clients.
// It is used when you want to broadcast a message to every client connected to the server.

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log(message);
    //io.emit("eveyone") emits to everyone

    //this is only send to those servers except the one which is sending
    socket.broadcast.emit("everyone", message);
  });

  console.log("New user Connected");
});

app.get("/", (req, res) => {
  console.log("Yes I am getting request");
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

server.listen(8000, () => {
  console.log("Server is running at 8000");
});
