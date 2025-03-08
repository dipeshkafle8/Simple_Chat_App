const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log(message);
    io.emit("everyone", message);
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
