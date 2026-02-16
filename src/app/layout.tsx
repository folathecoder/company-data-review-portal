import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Notification } from '@/components/Notification';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Company Data Review Portal',
  description:
    'Review and edit company records with inline validation and JSON export.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="dark">
    <body className={`${inter.variable} font-sans`}>
      {children}
      <Notification />
    </body>
  </html>
);

export default RootLayout;
