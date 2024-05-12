'use client';
import React from 'react';
import Button from '../components/Button';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';
import ThemedImage from './ThemedImage';

type Props = {};

export default function Navbar({}: Props) {
	const { resolvedTheme } = useTheme();
	let src = resolvedTheme === 'dark' ? '/dark-mode-logo.png' : '/logo.png';

	switch (resolvedTheme) {
		case 'light':
			src = '/logo.png';
			break;
		case 'dark':
			src = '/dark-mode-logo.png';
			break;
	}

	return (
		<div>
			<nav className='flex justify-between m-5'>
				<ThemedImage lightImage='/logo.png' darkImage='/dark-mode-logo.png' />
				<ul className='flex justify-between items-center'>
					<li className='p-5 '>
						<Button btnContent='Log in' hover={false}></Button>
					</li>
					<li className='p-5'>
						<Button
							hover={true}
							btnContent='Sign Up'
							textColor='text-white'
							bgColor='bg-primary/100'
						/>
					</li>
					<ThemeToggle />
				</ul>
			</nav>
		</div>
	);
}
