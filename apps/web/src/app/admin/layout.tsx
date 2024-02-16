import AdminAuthProvider from '@/providers/adminAuthProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "../globals.css"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Final Project JCWD-260202',
    description: 'Created By Kelompok 260202',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AdminAuthProvider>
                    {children}
                </AdminAuthProvider>
            </body>
        </html>
    )
}