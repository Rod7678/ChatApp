import express from 'express';
const app = express();
import http from 'http';
import path from 'path';
const server = http.Server(app);

app.use(express.static(path.resolve("./public")));
app.get('/', (req, res) => {
    return res.sendFile("/public/index.html")
})
server.listen(9000, () => console.log(`server running on localhost 9000`))