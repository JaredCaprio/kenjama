import React from 'react';
import Image from 'next/image';
import Button from './Button';

function Hero() {
    return (
        <div className="flex min-h-[550px]">
            <div>
                <Image
                    priority
                    src="/kenjama-hero-1920.png"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        opacity: '0.55',
                        maxWidth: '2000px',
                        zIndex: '-10',
                    }}
                    alt="kenjama hero image"
                />
            </div>
            <div className="m-auto flex h-full max-w-[1000px] flex-col items-start justify-center p-10">
                <h1 className="text-4xl md:text-7xl">
                    Connect, Play, Master -
                    <span className="text-primary/100">
                        Your Kendama Meetup Hub
                    </span>
                </h1>
                <p className="my-7 text-xl">
                    Bringing Kendama Enthusiasts Together for Endless Jam
                    Sessions
                </p>
                <Button
                    href="/sign-up"
                    willHover={true}
                    bgColor="bg-primary/100 text-white"
                >
                    Join Kenjama
                </Button>
            </div>
        </div>
    );
}

export default Hero;
