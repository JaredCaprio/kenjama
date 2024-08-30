'use client';
import React, { ReactNode } from 'react';

export type ButtonTypes = {
    willHover?: boolean;
    children?: ReactNode;
    onClick?: () => void;
    styles?: string;
    buttonType?: 'primary' | 'secondary' | 'tertiary';
};

type buttonThemeProps = {
    bgColor: string;
    textColor: string;
    hoverColor: string;
    border?: string;
};

const Button = ({
    willHover = true,
    children,
    buttonType = 'primary',
    onClick,
    styles,
}: ButtonTypes) => {
    let buttonTheme: buttonThemeProps = {
        bgColor: 'bg-primary',
        textColor: 'text-white',
        hoverColor: 'bg-tertiary/100',
        border: 'border-2 border-accent',
    };
    switch (buttonType) {
        case 'secondary':
            buttonTheme = {
                ...buttonTheme,
                bgColor: 'bg-none',
                hoverColor: 'bg-accentSecondary',
            };
            break;
        case 'tertiary':
            buttonTheme = {
                ...buttonTheme,
                bgColor: 'bg-tertiary',
            };
            break;
    }
    let className = `${buttonTheme.bgColor} ${buttonTheme.textColor} ${buttonTheme.border} px-2 py-1 cursor-pointer inline-flex rounded-md transition-all duration-500 ${styles} 
		${willHover && `hover:${buttonTheme.hoverColor}`}`;
    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    );
};

export default Button;
