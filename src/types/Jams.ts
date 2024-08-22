//Types for Jam data
export type JamDataType = {
    id?: string;
    title: string;
    dateTime: number;
    duration: string;
    hostName?: string;
    hostEmail?: string;
    description: string;
    howToFindUs: string;
    photo: File | null;
    location: string;
    address: string;
};
