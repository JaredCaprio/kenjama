'use client';
import React, { MutableRefObject, useRef, useState } from 'react';
import { storage } from '@/config/firebase-config';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { JamFormData } from '@/types/JamFormData';
import { ErrorState } from '@/types/JamFormData';
import JamForm from '@/components/JamForm';

export default function AddJamPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<ErrorState>();
    const fileInputRef: MutableRefObject<HTMLInputElement | null> =
        useRef(null);

    const [formData, setFormData] = useState<JamFormData>({
        title: '',
        dateTime: '',
        duration: '',
        photoURL: '',
        description: '',
        location: '',
        address: '',
        howToFindUs: '',
        id: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { id, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handlePhotoChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError({ errorMessage: '', errorID: '' });
        //check if file is contained in target
        if (e.target.files && e.target.files.length > 0) {
            //limit size to 2MB
            if (e.target.files[0].size > 2097152) {
                setError({
                    errorMessage: 'File is too big!',
                    errorID: uuidv4(),
                });
                if (fileInputRef?.current?.value) {
                    fileInputRef.current.value = '';
                }
                return;
            }
            if (fileInputRef?.current?.value) {
                //prevent svg files from being uploaded
                let matchResult =
                    fileInputRef.current.value.match(/\.([^\.]+)$/) ?? [];
                let ext = matchResult[1];
                switch (ext) {
                    case 'svg':
                        setError({
                            errorMessage: 'File Format Not Supported!',
                            errorID: uuidv4(),
                        });
                        fileInputRef.current.value = '';
                }
            }
            //Upload photo to firebase storage and get photoURL
            const file = e.target.files[0];
            let downLoadURL: string = '';
            if (file) {
                const jamPhotoRef = ref(
                    storage,
                    `images/JamPhotos/${file.name}`
                );
                const snapshot = await uploadBytes(jamPhotoRef, file);
                downLoadURL = await getDownloadURL(
                    ref(storage, snapshot.ref.fullPath)
                );
            }
            setFormData((prev) => ({ ...prev, photoURL: downLoadURL }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let updatedId = formData.id;

        if (!formData.id) {
            updatedId = uuidv4();
            setFormData((prev) => ({ ...prev, updatedId }));
        }
        //make post request to api sending jam data as payload
        if (!loading) {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jam/`, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    id: updatedId,
                    hostUser: user?.uid,
                }),
            });
        }

        router.push('/dashboard');
    };

    return (
        <JamForm
            handleInputChange={handleInputChange}
            handlePhotoChange={handlePhotoChange}
            error={error}
            fileInputRef={fileInputRef}
            formData={formData}
            handleSubmit={handleSubmit}
        />
    );
}
