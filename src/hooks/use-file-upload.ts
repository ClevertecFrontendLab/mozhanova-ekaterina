import { ChangeEvent, useState } from 'react';

export const useFileUpload = (preview?: string) => {
    const [file, setFile] = useState<File | null>(null);
    const [newPreview, setNewPreview] = useState(preview);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setNewPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return { handleFileChange, newPreview, file };
};
