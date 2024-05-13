'use client';
import React, { useState } from 'react';
import Button from '../components/Button';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';
import ThemedImage from './ThemedImage';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

type Props = {};

export default function Navbar({}: Props) {
	const [menuOpen, setMenuOpen] = useState(false);
	const { resolvedTheme } = useTheme();
	let src = resolvedTheme === 'dark' ? '/dark-mode-logo.png' : '/logo.png';

	const handleSetMenu = () => {
		setMenuOpen(!menuOpen);
	};

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
			<nav className='flex justify-between items-center m-5 '>
				<ThemedImage lightImage='/logo.png' darkImage='/dark-mode-logo.png' />
				<RxHamburgerMenu
					onClick={handleSetMenu}
					className={`${
						!menuOpen ? 'sm:hidden z-20' : 'hidden'
					} cursor-pointer min-w-10`}
					size={30}
				/>
				<IoMdClose
					onClick={handleSetMenu}
					className={`${
						menuOpen ? 'sm:hidden z-20' : 'hidden'
					} cursor-pointer min-w-10`}
					size={30}
				/>
				<ul className='hidden justify-between items-center sm:flex'>
					<li className='p-5'>
						<Button willHover={false}>Log in</Button>
					</li>
					<li className='p-5'>
						<Button
							willHover={true}
							textColor='text-white'
							bgColor='bg-primary/100'
						>
							Sign Up
						</Button>
					</li>
					<ThemeToggle />
				</ul>
			</nav>
			<nav
				className={
					menuOpen
						? 'fixed top-0 right-0 w-[60%] sm:hidden h-screen bg-background p-10 ease-in duration-200 z-10 opacity-85'
						: 'fixed left-[-100%]'
				}
			>
				<ul className='flex flex-col justify-between items-center space-y-10'>
					<li>
						<Button willHover={false}>Log in</Button>
					</li>
					<li>
						<Button willHover={false} textColor='text-content'>
							Sign Up
						</Button>
					</li>
					<ThemeToggle />
				</ul>
			</nav>
		</div>
	);
}
