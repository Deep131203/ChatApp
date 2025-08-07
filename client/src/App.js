import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import io from 'socket.io-client';
import ChatMessage from './components/ChatMessage';
import './App.css';

// Initialize socket connection
const socket = io('http://localhost:5001');

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Listen for typing status
    socket.on('typing', (data) => {
      setIsTyping(data.isTyping);
    });

    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    socket.emit('typing', { isTyping: true });
    setTimeout(() => {
      socket.emit('typing', { isTyping: false });
    }, 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        text: messageInput,
        sender: 'user',
        timestamp: new Date(),
      };
      socket.emit('sendMessage', newMessage);
      setMessageInput('');
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessageInput(prev => prev + emojiData.emoji);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setFilteredMessages([]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = messages.filter(message => 
        message.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]);
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && !event.target.closest('.emoji-picker-container')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <div className="App">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-left">
            <img 
              src="https://api.dicebear.com/6.x/bottts/svg?seed=chatbot"
              alt="Profile" 
              className="profile-pic"
            />
            <div className="header-info">
              <h2>MERN Chatbot</h2>
              <span className="status">Online</span>
            </div>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search messages..."
                className={`search-input ${isSearchActive ? 'active' : ''}`}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <SearchIcon 
                className="search-icon"
                onClick={toggleSearch}
              />
            </div>
            <MenuIcon className="header-icon" />
          </div>
        </header>

        <div className="messages-container">
          {(searchQuery ? filteredMessages : messages).map((message, index) => (
            <ChatMessage 
              key={index}
              message={message}
              isUser={message.sender === 'user'}
            />
          ))}
          {isTyping && !searchQuery && (
            <motion.div 
              className="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="input-form">
          <div className="input-actions">
            <InsertEmoticonIcon 
              className="emoji-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
            <AttachFileIcon 
              className="attach-button"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="message-input"
            />
            {showEmojiPicker && (
              <div className="emoji-picker-container" onClick={e => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          
          <button type="submit" className="send-button">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;