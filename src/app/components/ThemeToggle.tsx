import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

type Props = {};

const ThemeToggle = (props: Props) => {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<div
			className='relative w-16 h-8 flex items-center bg-content/100 cursor-pointer rounded-full p-1'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
		>
			<FaMoon className='text-white' size={18} />
			<div
				className='absolute bg-background/100 w-6 h-6 rounded-full shadow-md transition-all duration-500'
				style={resolvedTheme == 'dark' ? { left: '2px' } : { right: '2px' }}
			></div>
			<BsSunFill className='text-black ml-auto' size={18} />
		</div>
	);
};

export default ThemeToggle;
