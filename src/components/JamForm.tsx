import { JamFormData } from '@/types/JamFormData';
import React, { MutableRefObject } from 'react';
import Image from 'next/image';
import { ErrorState } from '@/types/JamFormData';

type Props = {
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    handlePhotoChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void>;
    formData: JamFormData;
    fileInputRef: MutableRefObject<HTMLInputElement | null>;
    error: ErrorState | undefined;
};

function JamForm({
    handleSubmit,
    handleInputChange,
    formData,
    fileInputRef,
    error,
    handlePhotoChange,
}: Props) {
    return (
        <main className="flex max-w-2xl flex-col justify-between px-12 pb-24 ">
            <h1 className="mb-4 text-3xl ">Create a Jam</h1>
            <form
                onSubmit={handleSubmit}
                className="min-w-3xl space-y-6 rounded-lg border-2 border-accent p-6 shadow-md"
            >
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-content"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="dateTime"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Date and Time
                    </label>
                    <input
                        id="dateTime"
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Duration
                    </label>
                    <select
                        id="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Select Duration</option>
                        <option value="30">30 min</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Photo Upload
                    </label>
                    {formData?.photoURL && (
                        <Image
                            src={formData?.photoURL}
                            alt=""
                            width={200}
                            height={200}
                        ></Image>
                    )}
                    <input
                        ref={fileInputRef}
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="mt-1 block w-full bg-gray-900 p-4 text-gray-100"
                    />

                    <span className="font-semibold text-red-800">
                        {error && error.errorMessage}
                    </span>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="howToFindUs"
                        className="block text-sm font-medium text-gray-300"
                    >
                        How to Find Us
                    </label>
                    <textarea
                        id="howToFindUs"
                        value={formData.howToFindUs}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 p-4 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={3}
                        required
                    />
                </div>
                <div className="flex flex-col justify-between sm:flex-row ">
                    <button
                        type="submit"
                        className="sm:md-0 mb-4 mr-3 inline-block w-full rounded-md bg-primary px-4 py-2 text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Save Changes
                    </button>
                    <button className="sm:md-0 mb-4 inline-block w-full rounded-md bg-accentSecondary px-4 py-2 text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}

export default JamForm;
