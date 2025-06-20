import { ChangeEvent, useState } from 'react';

export const useFileUpload = (onUpload?: (formData: FormData) => void, preview?: string) => {
    const [localFile, setLocalFile] = useState<File | null>(null);
    const [localPreview, setLocalPreview] = useState(preview);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setLocalFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            const newPreview = reader.result as string;
            setLocalPreview(newPreview);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = () => {
        if (!localFile) return;

        const formData = new FormData();
        formData.append('file', localFile);

        onUpload?.(formData);
    };

    return { handleFileChange, localPreview, onSubmit };
};
