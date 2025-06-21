import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop';

import { getCroppedImg } from '~/utils/get-cropped-img';

export const useImgCropper = (preview?: string) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const getCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;

        const croppedBlob = await getCroppedImg(preview!, croppedAreaPixels);
        return new File([croppedBlob], 'cropped.jpg', {
            type: 'image/jpeg',
            lastModified: Date.now(),
        });
    }, [croppedAreaPixels, preview]);

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    return {
        crop,
        setCrop,
        zoom,
        setZoom,
        getCroppedImage,
        onCropComplete,
    };
};
