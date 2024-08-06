import { Typography, Box, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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
      {!isUser && (
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
          <SmartToyIcon />
        </Avatar>
      )}
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
      {isUser && (
        <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
}