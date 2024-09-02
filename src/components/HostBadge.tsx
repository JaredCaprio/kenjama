import Link from 'next/link';
import AttendanceButton from './Buttons/AttendanceButton';
import Image from 'next/image';

type HostBadgeProps = {
    photoURL: string;
    displayName: string;
    userId: string | undefined;
    jamId: string;
};

const HostBadge = ({
    photoURL,
    displayName,
    userId,
    jamId,
}: HostBadgeProps) => {
    return (
        <div className="mb-10 flex  items-center justify-between  ">
            <Link className="flex gap-5" href={`/profile/${userId}`}>
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
            <AttendanceButton eventId={jamId} userId={userId} />
        </div>
    );
};

export default HostBadge;
