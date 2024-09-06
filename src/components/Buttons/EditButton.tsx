import Link from 'next/link';
import Button from './Button';
import { FaEdit } from 'react-icons/fa';
import { Jam } from '@/types/Jam';

type EditButtonTypes = {
    jamData: Jam;
};

const EditButton = ({ jamData }: EditButtonTypes) => {
    const styles = `flex items-center gap-x-2 ml-5 px-2 py-1`;
    const {
        title,
        dateTime,
        duration,
        photoURL,
        description,
        location,
        address,
        howToFindUs,
        id,
    } = jamData;
    const searchParamsURI =
        `${process.env.NEXT_PUBLIC_BASE_URL}/jam/edit?` +
        `title=${encodeURIComponent(title)}&` +
        `dateTime=${encodeURIComponent(dateTime)}&` +
        `duration=${encodeURIComponent(duration)}&` +
        `photoURL=${encodeURIComponent(photoURL)}&` +
        `description=${encodeURIComponent(description)}&` +
        `location=${encodeURIComponent(location)}&` +
        `address=${encodeURIComponent(address)}&` +
        `howToFindUs=${encodeURIComponent(howToFindUs)}&` +
        `id=${encodeURIComponent(id)}`;

    return (
        <Link href={searchParamsURI}>
            <Button styles={styles} buttonType="secondary">
                <FaEdit style={{ margin: '4px 8px' }} />
            </Button>
        </Link>
    );
};

export default EditButton;
