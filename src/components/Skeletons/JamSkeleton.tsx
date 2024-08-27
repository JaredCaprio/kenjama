'use client';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ThemeWrapper from './ThemeWrapper';

export const JamSkeleton = () => (
    <div>
        <ThemeWrapper>
            <Skeleton height={40} width={300} className="mb-4" />
            <div className="mb-10 flex items-center gap-4">
                <Skeleton circle width={50} height={50} />
                <div>
                    <Skeleton width={100} />
                    <Skeleton width={150} />
                </div>
            </div>
            <div className="flex flex-col gap-10 md:flex-row">
                <div className="flex-grow basis-0">
                    <Skeleton height={300} className="mb-4" />
                    <Skeleton count={3} className="mb-2" />
                </div>
                <div className="flex-grow basis-0">
                    <Skeleton height={200} className="mb-4" />
                    <Skeleton count={2} className="mb-2" />
                </div>
            </div>
        </ThemeWrapper>
    </div>
);
