# MERN Chatbot

![MERN Chatbot](https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)

A real-time chat application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack featuring a responsive WhatsApp-like interface.

## Features

- 💬 Real-time messaging using Socket.IO
- 🎯 WhatsApp-inspired UI design
- 🔍 Message search functionality
- 😊 Emoji picker integration
- 📎 File attachment support
- ⌨️ Typing indicators
- ✅ Read receipts
- 🔄 Auto-scroll to latest messages
- 📱 Responsive design

## Technologies Used

- **Frontend:**
  - React.js
  - Material-UI Icons
  - Framer Motion
  - Socket.IO Client
  - Emoji Picker React

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO
  - Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Deep-Git-ai/mern-chatbot.git
cd mern-chatbot
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Configure environment variables
```bash
# In the server directory, create a .env file
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development servers
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5001`

## Project Structure

```
mern-chatbot/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── server/
    ├── models/
    ├── server.js
    └── package.json
```

## Features in Detail

### Real-time Communication
- Socket.IO integration for instant message delivery
- Typing indicators when users are composing messages
- Real-time status updates

### User Interface
- Clean and modern WhatsApp-inspired design
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Dark theme support

### Message Features
- Text messages with timestamps
- Emoji picker integration
- File attachment support
- Message search functionality
- Read receipts
- Auto-scroll to new messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Deep-Git-ai

## Acknowledgments

- WhatsApp Web for UI inspiration
- Socket.IO for real-time capabilities
- Material-UI for icons and components

## Last Updated

2025-08-07

---

Made with ❤️ using MERN Stack
