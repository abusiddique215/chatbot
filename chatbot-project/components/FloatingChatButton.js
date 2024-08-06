'use client';

import { useState } from 'react';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatWindow from './ChatWindow';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: '#ff9900',
          '&:hover': {
            bgcolor: '#e68a00',
          },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChatIcon />
      </Fab>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}
