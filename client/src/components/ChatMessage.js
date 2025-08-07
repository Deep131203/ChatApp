import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatMessage = ({ message, isUser }) => {
  const messageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: isUser ? 100 : -100,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={`message ${isUser ? 'user-message' : 'bot-message'}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="message-content">{message.text}</div>
      <div className="message-info">
        <span className="message-time">
          {format(new Date(message.timestamp), 'HH:mm')}
        </span>
        {isUser && (
          <span className="message-status">
            <DoneAllIcon 
              className="read-status" 
              fontSize="small" 
              style={{ color: '#34B7F1' }}
            />
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;