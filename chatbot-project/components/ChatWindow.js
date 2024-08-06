'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, MinimizeIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

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
        width: 280,
        height: 420,
        bgcolor: '#1c2235',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ bgcolor: '#060609', color: 'white', p: 0.75, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2">Headstarter Assistant</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white', p: 0.25 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5, height: 30 }}>
              <img src="/headstarter-logo.png" alt="Headstarter Logo" style={{ height: '100%', width: 'auto' }} />
            </Box>
            <Typography variant="caption" sx={{ mb: 0.5, textAlign: 'center', color: 'white' }}>
              Enhance your interview preparation with Headstarter Assistant.
            </Typography>
            <Typography variant="caption" sx={{ mb: 0.5, textAlign: 'center', color: 'white' }}>
              Select a topic to get started:
            </Typography>
          </>
        )}
        {messages.map((msg, index) => (
          <Typography key={index} variant="caption" sx={{ mb: 0.25, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%', p: 0.5, borderRadius: 1, bgcolor: msg.sender === 'user' ? '#26D0CE' : '#1A2980', color: 'white' }}>
            {msg.text}
          </Typography>
        ))}
        <div ref={messagesEndRef} />
        
        {messages.length === 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 1 }}>
            {suggestionTopics.map((topic, index) => (
              <Button 
                key={index}
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
                  '&:hover': {
                    bgcolor: 'rgba(38, 208, 206, 0.2)',
                    borderColor: '#26D0CE',
                  }
                }}
              >
                {topic}
              </Button>
            ))}
          </Box>
        )}
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
              '&:before, &:after': {
                borderColor: '#26D0CE',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderColor: '#26D0CE',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
            },
          }}
        />
        <IconButton onClick={() => handleSend(input)} sx={{ color: '#26D0CE', p: 0.25 }}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}