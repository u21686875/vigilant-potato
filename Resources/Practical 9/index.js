const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var currentUser;

io.on('connection', (socket) => {
  socket.on('setUsername', function(data){
    // console.log(data);
    currentUser = data;
  });

  console.log(currentUser + ' connected');

  socket.on('chatMessage', (data) => {
    console.log(data.msg)
    io.emit('chatMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(currentUser + ' disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});