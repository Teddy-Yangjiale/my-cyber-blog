import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MatrixRain from '@/components/MatrixRain';
import Spotlight from '@/components/Spotlight';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cyber Blog',
  description: 'Future Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        <MatrixRain />
        <Spotlight />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}