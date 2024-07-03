const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const connectToDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://artistehub.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Connect to MongoDB
connectToDB();

app.use(cors());
app.use(express.json());

// Routes for posts
app.use('/api/posts', postRoutes);

// Default route for root
app.get('/', (req, res) => {
  res.send('Bienvenue sur ArtisteHub Server!');
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('audioComment', async (postId, audioData) => {
    const post = await Post.findById(postId);
    post.comments.push(audioData);
    await post.save();
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
