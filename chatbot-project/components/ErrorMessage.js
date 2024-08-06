import { Alert } from '@mui/material';

export default function ErrorMessage({ message }) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
}
