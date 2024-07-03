const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://artistehub.vercel.app',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('audioComment', (postId, audioData) => {
    // Diffusez les données audio à tous les clients connectés, sauf à l'expéditeur
    socket.broadcast.emit('newAudioComment', postId, audioData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
