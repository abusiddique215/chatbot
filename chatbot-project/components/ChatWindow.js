'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 350,
        height: 500,
        bgcolor: '#1c2235',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ bgcolor: '#060609', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Headstarter Assistant</Typography>
        <Box>
          <IconButton onClick={onClose} sx={{ color: 'white', mr: 1 }}>
            <MinimizeIcon />
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, height: 100 }}>
              <img src="/headstarter-logo.png" alt="Headstarter Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', color: 'white' }}>
              Enhance your interview preparation with Headstarter Assistant, providing helpful guidance and recommendations.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'white' }}>
              You can get started by selecting one of the following topics:
            </Typography>
          </>
        )}
        {messages.map((msg, index) => (
          <Typography key={index} variant="body1" sx={{ mb: 1, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%', p: 1, borderRadius: 1, bgcolor: msg.sender === 'user' ? '#26D0CE' : '#1A2980', color: 'white' }}>
            {msg.text}
          </Typography>
        ))}
        <div ref={messagesEndRef} />
        
        {messages.length === 0 && suggestionTopics.map((topic, index) => (
          <Button 
            key={index}
            variant="outlined" 
            onClick={() => handleSend(topic)}
            sx={{ 
              display: 'block', 
              mb: 1, 
              textAlign: 'left', 
              whiteSpace: 'normal',
              color: '#26D0CE',
              borderColor: '#26D0CE',
              '&:hover': {
                bgcolor: 'rgba(38, 208, 206, 0.1)',
                borderColor: '#26D0CE',
              }
            }}
          >
            {topic}
          </Button>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #26D0CE', display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask a question"
          sx={{ 
            mr: 1,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: '#26D0CE',
              },
              '&:hover fieldset': {
                borderColor: '#26D0CE',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#26D0CE',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        />
        <IconButton onClick={() => handleSend(input)} sx={{ color: '#26D0CE' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}