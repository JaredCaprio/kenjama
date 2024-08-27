import { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

type ThemeWrapperProps = {
    children: ReactNode;
};

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
    return (
        <SkeletonTheme baseColor="#151515" highlightColor="#110f0f">
            {children}
        </SkeletonTheme>
    );
};

export default ThemeWrapper;
