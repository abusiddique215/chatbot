'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import LoadingDots from './LoadingDots';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
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
    "Practice Interview",
    "Resume Tips",
    "Technical Skills",
    "Soft Skills",
    "Job Search",
    "Interview Prep",
    "Career Advice",
    "Coding Challenge"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (message) => {
    if (message.trim() === '') return;
    setShowInitialContent(false);
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process that request. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
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
        userSelect: 'none',
        zIndex: 9999,
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1c2235',
          borderRadius: '16px',
          boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5), 0 20px 60px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ bgcolor: '#060609', color: 'white', p: 0.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Headstarter Assistant</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white', p: 0.25 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
          {showInitialContent ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: showInitialContent ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                <img src="/headstarter-logo.png" alt="Headstarter Logo" style={{ width: '30%', height: 'auto' }} />
              </Box>
              <Typography variant="body1" align="center" gutterBottom sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 'bold' }}>
                How can I assist you today?
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5 }}>
                {suggestionTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => handleSend(topic)}
                    sx={{
                      margin: '2px',
                      fontSize: '0.6rem',
                      color: '#26D0CE',
                      borderColor: '#26D0CE',
                      borderRadius: '20px',
                      padding: '2px 8px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(38, 208, 206, 0.1)',
                        borderColor: '#26D0CE',
                      },
                    }}
                  >
                    {topic}
                  </Button>
                ))}
              </Box>
            </motion.div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 1,
                      borderRadius: 2,
                      bgcolor: msg.sender === 'user' ? '#26D0CE' : '#1A2980',
                      color: 'white',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{msg.text}</Typography>
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 1,
                      borderRadius: 2,
                      bgcolor: '#1A2980',
                      color: 'white',
                    }}
                  >
                    <LoadingDots />
                  </Box>
                </Box>
              )}
            </>
          )}
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