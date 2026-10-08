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

const count = io.engine.clientsCount;
io.on("connection", async (socket) => {
  io.socketsJoin("room1");
  socket.on('added username', (username)=> 
    socket.data.username = username
  )
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
  socket.on("disconnect", () => {
    io.emit("user online", socket.data.username);
  });
  const sockets = await io.in("room1").fetchSockets();
  for (const socket of sockets) {
    console.log('socket id',socket.id);
    // console.log(socket.handshake);
    console.log("socket rooms",socket.rooms);
    console.log("socket data",socket.data);
    // socket.emit(/* ... */);
    // socket.join(/* ... */);
    // socket.leave(/* ... */);
    // socket.disconnect(/* ... */);
  }
});

server.listen(9000, () => console.log(`server running on localhost 9000`));
