'use client';

import FloatingChatButton from '../components/FloatingChatButton';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'transparent' }}>
      {/* Your existing page content */}
      <FloatingChatButton />
    </Box>
  );
}