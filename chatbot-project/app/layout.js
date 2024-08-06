import { Inter } from "next/font/google";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headstarter Support Assistant",
  description: "AI-powered support for Headstarter users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}