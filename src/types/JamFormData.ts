export type JamFormData = {
    title: string;
    dateTime: string;
    duration: string;
    photoURL: string;
    description: string;
    location: string;
    address: string;
    howToFindUs: string;
    id: string;
};

export type ErrorState = {
    errorMessage?: string;
    errorID: string;
};
