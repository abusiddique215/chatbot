'use client';

import { Box, Avatar, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      {!isUser && <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}><ImageIcon /></Avatar>}
      <Box
        sx={{
          maxWidth: '70%',
          p: 1,
          borderRadius: 2,
          bgcolor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
      </Box>
      {isUser && <Avatar sx={{ ml: 1 }} src="/path-to-user-avatar.jpg" />}
    </Box>
  );
}