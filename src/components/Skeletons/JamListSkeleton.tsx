import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import ThemeWrapper from './ThemeWrapper';

const JamListSkeleton = ({ count = 3 }: { count?: number }) => {
    return (
        <ThemeWrapper>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="flex cursor-pointer flex-col items-center gap-10 border-2 border-borderDefault p-5 sm:flex-row sm:justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">
                            <Skeleton width={200} />
                        </h2>
                        <p>
                            <FaClock className="mr-2 inline text-accent" />
                            <Skeleton width={250} />
                        </p>
                        <p className="flex items-center">
                            <FaLocationDot className="mr-2 inline text-accent" />
                            <Skeleton width={200} />
                            <br />
                            <Skeleton width={150} />
                        </p>
                    </div>
                    <div
                        style={{
                            width: '150px',
                            height: '150px',
                        }}
                    >
                        <Skeleton width={150} height={150} />
                    </div>
                </div>
            ))}
        </ThemeWrapper>
    );
};

export default JamListSkeleton;
