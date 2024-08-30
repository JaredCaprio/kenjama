import React, { ReactNode } from 'react';
import Button from './Button';

type IconButtonProps = {
    icon: ReactNode;
    willHover?: boolean;
    onClick?: () => void;
    children: ReactNode;
    buttonType?: 'primary' | 'secondary' | 'tertiary';
};

const IconButton = ({
    icon,
    willHover = true,
    onClick,
    children,
    buttonType = 'primary',
}: IconButtonProps) => {
    let iconButtonStyles = `inline-flex items-center gap-x-2`;
    return (
        <Button
            willHover={willHover}
            onClick={onClick}
            styles={iconButtonStyles}
            buttonType={buttonType}
        >
            {icon}
            {children}
        </Button>
    );
};

export default IconButton;
