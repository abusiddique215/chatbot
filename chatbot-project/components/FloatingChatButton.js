'use client';

import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatWindow from './ChatWindow';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <Fab
          color="primary"
          aria-label="chat"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: '#26D0CE',
            '&:hover': {
              bgcolor: '#1A2980',
            },
          }}
          onClick={() => setIsOpen(true)}
        >
          <ChatIcon />
        </Fab>
      )}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}