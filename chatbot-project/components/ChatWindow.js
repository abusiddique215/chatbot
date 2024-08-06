'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;
        setMessages(prevMessages => [...prevMessages.slice(0, -1), assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 80,
        right: 16,
        width: 300,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Headstarter Assistant</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
}