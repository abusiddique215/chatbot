import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const blink = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

export default function LoadingDots() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24px' }}>
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            width: 6,
            height: 6,
            bgcolor: 'white',
            borderRadius: '50%',
            mx: 0.5,
            animation: `${blink} 1.4s infinite both`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </Box>
  );
}