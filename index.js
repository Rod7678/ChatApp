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

io.on('connection', (socket) => {;
    console.log('a user connect',socket.id);
    socket.on('disconnect', ()=>{
        console.log("user disconnect")
    })
})
server.listen(9000, () => console.log(`server running on localhost 9000`));
