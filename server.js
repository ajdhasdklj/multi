const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');  // Import cors

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());  // Enable CORS

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
