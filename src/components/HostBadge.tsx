'use client';
import Link from 'next/link';
import AttendanceButton from './Buttons/AttendanceButton';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type HostBadgeProps = {
    photoURL: string;
    displayName: string;
    userId: string | undefined;
};

const HostBadge = ({ photoURL, displayName, userId }: HostBadgeProps) => {
    const { Id } = useParams<{ Id: string }>();
    return (
        <div className="mb-10 flex  items-center justify-between  ">
            <Link className="flex gap-5" href="/profile/345">
                <Image
                    src={photoURL}
                    alt="alternative text"
                    style={{ borderRadius: '50px' }}
                    height={50}
                    width={50}
                />
                <div>
                    <p>Hosted by</p>{' '}
                    <p className="font-semibold">{displayName}</p>
                </div>
            </Link>
            <AttendanceButton eventId={Id} userId={userId} />
        </div>
    );
};

export default HostBadge;
