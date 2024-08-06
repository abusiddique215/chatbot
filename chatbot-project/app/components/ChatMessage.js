import { Typography, Box } from '@mui/material';

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
      <Box
        sx={{
          maxWidth: '70%',
          padding: 1,
          borderRadius: 1,
          backgroundColor: isUser ? 'primary.light' : 'grey.200',
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
      </Box>
    </Box>
  );
}
