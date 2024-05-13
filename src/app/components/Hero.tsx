import React from 'react';
import Image from 'next/image';
import Button from './Button';

function Hero() {
	return (
		<div className='relative w-screen min-h-[95vh] m-auto'>
			<div style={{ zIndex: '-1' }}>
				<Image
					priority
					src='/kenjama-hero-1920.png'
					fill
					style={{
						objectFit: 'cover',
						objectPosition: 'center',
						opacity: '0.55',
						maxWidth: '2000px',
					}}
					alt='kenjama hero image'
				/>
			</div>
			<div className='flex flex-col relative justify-center items-start p-16 max-w-md md:max-w-3xl'>
				<h1 className='text-4xl md:text-7xl'>
					Connect, Play, Master -
					<span className='text-primary/100'>Your Kendama Meetup Hub</span>
				</h1>
				<p className='text-xl my-7'>
					Bringing Kendama Enthusiasts Together for Endless Jam Sessions
				</p>
				<Button willHover={true} bgColor='bg-primary/100 text-white'>
					Join Kenjama
				</Button>
			</div>
		</div>
	);
}

export default Hero;
