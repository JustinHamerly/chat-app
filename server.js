const express = require('express');
const cors = require('cors');
const app = express();

const server = app.listen(3000);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('new User');
  socket.emit('chat-message', 'Welcome!');
  socket.on('send-chat-message', message => {
    console.log(message)
  })
});
