import { Inter } from "next/font/google";
import ThemeRegistry from '../components/ThemeRegistry';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headstarter Support Assistant",
  description: "AI-powered support for Headstarter users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>{children}</body>
      </ThemeRegistry>
    </html>
  );
}