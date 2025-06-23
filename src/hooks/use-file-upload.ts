import Compressor from 'compressorjs';
import { ChangeEvent, useState } from 'react';

export const useFileUpload = (preview?: string) => {
    const [file, setFile] = useState<File | null>(null);
    const [newPreview, setNewPreview] = useState(preview);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        new Compressor(file, {
            quality: 0.6,
            success(result) {
                setFile(result as File);
            },
        });
        const reader = new FileReader();
        reader.onload = () => {
            setNewPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return { handleFileChange, newPreview, file };
};
