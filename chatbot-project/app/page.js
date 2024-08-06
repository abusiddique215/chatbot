'use client';

import FloatingChatButton from '../components/FloatingChatButton';
import { Box, Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'transparent', py: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Headstarter
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Empowering Your Career Journey
        </Typography>
        <Typography variant="body1" paragraph>
          Headstarter is your gateway to a successful career in tech. We provide resources, mentorship, and opportunities to help you excel in the competitive world of technology.
        </Typography>
        <Typography variant="body1" paragraph>
          Explore our services, connect with industry professionals, and take the first step towards your dream career.
        </Typography>
        {/* Add more content here as needed */}
      </Box>
      <FloatingChatButton />
    </Container>
  );
}