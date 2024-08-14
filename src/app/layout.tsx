import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';

import { AuthContextProvider } from '@/contexts/authContext';

export const metadata: Metadata = {
    title: 'Kenjama | Jam with Friends',
    description: 'You kendama Jam Hub',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en" className="dark">
            <AuthContextProvider>
                <body className="container m-auto h-screen bg-black/95 text-white">
                    <Navbar />
                    {children}
                </body>
            </AuthContextProvider>
        </html>
    );
}
