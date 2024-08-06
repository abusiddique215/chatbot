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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
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
                transform: 'none',
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}