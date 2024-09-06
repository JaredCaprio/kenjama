import Link from 'next/link';
import AttendanceButton from './Buttons/AttendanceButton';
import Image from 'next/image';
import EditButton from './Buttons/EditButton';
import { Jam } from '@/types/Jam';
import DeleteButton from './Buttons/DeleteButton';

type HostBadgeProps = {
    photoURL: string;
    displayName: string;
    userId: string | undefined;
    jamData: Jam;
};

const HostBadge = ({
    photoURL,
    displayName,
    userId,
    jamData,
}: HostBadgeProps) => {
    return (
        <div className="mb-10 flex items-center justify-between  ">
            <Link
                className="flex gap-5"
                href={`/profile/${jamData?.hostUser?.uid}`}
            >
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
            <div>
                <AttendanceButton eventId={jamData?.id} userId={userId} />
                {userId === jamData?.hostUser?.uid && (
                    <>
                        <EditButton jamData={jamData} />
                        <DeleteButton />
                    </>
                )}
            </div>
        </div>
    );
};

export default HostBadge;
