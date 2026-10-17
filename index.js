import express from "express";
const app = express();
import http from "http";
import path from "path";
const server = http.Server(app);
import { Server } from "socket.io";

const io = new Server(server);

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

// io.use(async (socket, next) => {
//   try {
//     const user = await fetchUser(socket);
//     socket.user = user;
//   } catch (e) {
//     next(new Error("unknown user"));
//   }
// });

io.on("connection", async (socket) => {
  console.log(socket.user);
  io.socketsJoin("room1");
  socket.on("user name", (username) => {
    console.log(username);
    
    socket.data.username = username;
    socket.emit("user name", username);
  });

  socket.on("user typing", (username) => {
    socket.broadcast.emit("user typing", username);
  });
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
  socket.on("disconnect", () => {
    io.emit("user online", socket.data.username);
  });
  const sockets = await io.in("room1").fetchSockets();
  for (const socket of sockets) {
    console.log("socket id", socket.id);
    // console.log(socket.handshake);
    console.log("socket rooms", socket.rooms);
    console.log("socket data", socket.data);
    // socket.emit(/* ... */);
    // socket.join(/* ... */);
    // socket.leave(/* ... */);
    // socket.disconnect(/* ... */);
  }
});

server.listen(9000, () => console.log(`server running on localhost 9000`));
