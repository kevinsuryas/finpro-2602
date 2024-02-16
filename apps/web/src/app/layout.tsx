import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from "next-auth"
import "./globals.css"

import { TanstackProvider } from '@/providers/tanstackProvider';
import Navbar from '@/components/cores/Navbar';
import Footer from '@/components/cores/Footer';
import ReduxProvider from '@/providers/ReduxProvider';
import SessionProvider from '@/components/cores/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Final Project JCWD-260202',
  description: 'Created By Kelompok 260202',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReduxProvider>
            <TanstackProvider>
              {/* <Navbar /> */}
              {children}
              {/* <Footer /> */}
            </TanstackProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
