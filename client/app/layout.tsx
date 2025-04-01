import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigationBar/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Book Library',
  description: 'App for book storage and user reviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[2000px] mx-auto main-background`}
      >
        <Navbar />
        <main>{children}</main>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
