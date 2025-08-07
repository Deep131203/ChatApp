const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Deep1312:Deep%402003@cluster0.p8nxl3g.mongodb.net/chatbot?retryWrites=true&w=majority';

// MongoDB Atlas connection with error handling
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB Atlas connection error:', error.message);
  // Log the connection string being used (but mask the password)
  const maskedURI = mongoURI.replace(/(:.[^@]*@)/, ':****@');
  console.log('Attempted connection string:', maskedURI);
});

// Message Schema
const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('sendMessage', async (message) => {
    try {
      socket.broadcast.emit('typing', { isTyping: true });

      const newMessage = new Message({
        text: message.text,
        sender: message.sender,
        timestamp: new Date()
      });
      await newMessage.save();
      io.emit('message', newMessage);

      setTimeout(async () => {
        socket.broadcast.emit('typing', { isTyping: false });
        const botResponse = new Message({
          text: `Echo: ${message.text}`,
          sender: 'bot',
          timestamp: new Date()
        });
        await botResponse.save();
        io.emit('message', botResponse);
      }, Math.random() * 1000 + 1000);

    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});