'use client';

import { useState, useEffect } from 'react';
import { Fab, Box } from '@mui/material';
import ChatWindow from './ChatWindow';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Fab
              color="primary"
              aria-label="chat"
              sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                bgcolor: '#1c2235',
                '&:hover': {
                  bgcolor: '#060609',
                },
                width: 56,
                height: 56,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
              }}
              onClick={() => setIsOpen(true)}
            >
              <Box
                component="img"
                src="/noheadstarter.png"
                alt="Headstarter Logo"
                sx={{
                  width: '70%',
                  height: '70%',
                  objectFit: 'contain',
                }}
              />
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}