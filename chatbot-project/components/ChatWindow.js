'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './ChatMessage';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and send the message
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