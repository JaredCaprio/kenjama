import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import { ThemeProvider } from 'next-themes';

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
		<html suppressHydrationWarning lang='en'>
			<body className='container m-auto'>
				<ThemeProvider attribute='class' defaultTheme='system'>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
