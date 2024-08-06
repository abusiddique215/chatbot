'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-20, 20], [10, -10]);
  const rotateY = useTransform(x, [-20, 20], [-10, 10]);

  const bind = useDrag(({ offset: [ox, oy], down }) => {
    x.set(down ? ox : 0);
    y.set(down ? oy : 0);
  }, {
    bounds: { left: -20, right: 20, top: -20, bottom: 20 },
    rubberband: true
  });

  const suggestionTopics = [
    "How do I start a practice interview?",
    "What programming languages are covered?",
    "How can I track my progress?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (message) => {
    if (message.trim() === '') return;
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process that request.", sender: 'bot' }]);
    }
  };

  return (
    <motion.div
      {...bind()}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 280,
        height: 420,
        perspective: 1000,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
        userSelect: 'none',
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1c2235',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ bgcolor: '#060609', color: 'white', p: 0.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Headstarter Assistant</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white', p: 0.25 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, display: 'flex', flexDirection: 'column' }}>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, height: 30 }}>
                <img src="/headstarter-logo.png" alt="Headstarter Logo" style={{ height: '100%', width: 'auto' }} />
              </Box>
              <Typography variant="body2" sx={{ mb: 1, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                Enhance your interview preparation with Headstarter Assistant.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, mt: 2, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                Select a topic to get started:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 1 }}>
                {suggestionTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Button 
                      variant="outlined" 
                      onClick={() => handleSend(topic)}
                      sx={{ 
                        textTransform: 'none',
                        color: '#26D0CE',
                        borderColor: '#26D0CE',
                        fontSize: '0.6rem',
                        padding: '1px 8px',
                        borderRadius: '50px',
                        transition: 'all 0.3s',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'rgba(38, 208, 206, 0.2)',
                          borderColor: '#26D0CE',
                        }
                      }}
                    >
                      {topic}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="body2" sx={{ mb: 0.25, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%', p: 0.5, borderRadius: 1, bgcolor: msg.sender === 'user' ? '#26D0CE' : '#1A2980', color: 'white', fontWeight: 'bold' }}>
                {msg.text}
              </Typography>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ p: 0.5, borderTop: '1px solid #26D0CE', display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="standard"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask a question"
            sx={{ 
              mr: 0.5,
              '& .MuiInput-root': {
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                '&:before, &:after': {
                  borderColor: '#26D0CE',
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderColor: '#26D0CE',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }}
          />
          <IconButton onClick={() => handleSend(input)} sx={{ color: '#26D0CE', p: 0.25 }}>
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </motion.div>
    </motion.div>
  );
}