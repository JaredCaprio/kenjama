'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type Props = {
	lightImage: string;
	darkImage: string;
};

const ThemedImage = ({ lightImage, darkImage }: Props) => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	let srcImage: string;

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	switch (resolvedTheme) {
		case 'light':
			srcImage = lightImage;
			break;
		case 'dark':
			srcImage = darkImage;
			break;
		default:
			srcImage = lightImage;
			break;
	}

	return (
		<Image
			src={srcImage}
			alt='themed image'
			width={200}
			height={200}
			loading='lazy'
		/>
	);
};

export default ThemedImage;
