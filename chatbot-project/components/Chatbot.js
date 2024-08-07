import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fab, Box, CircularProgress } from '@mui/material';
import config from '../config/chatbotConfig';
import ChatWindow from './ChatWindow';  // Import ChatWindow directly

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

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
                bgcolor: config.colors.primary,
                '&:hover': {
                  bgcolor: config.colors.primaryHover,
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
                src={config.logoUrl}
                alt={config.logoAlt}
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
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}