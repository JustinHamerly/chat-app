const express = require('express');
const cors = require('cors');
const app = express();

const server = app.listen(3000);

const users = {};

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name)
  })
  socket.emit('chat-message', 'Welcome!');
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
  })
});
