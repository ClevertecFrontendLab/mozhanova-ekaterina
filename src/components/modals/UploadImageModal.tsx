import { Box, Grid, Image } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import default_image from '~/assets/ui/image_default.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useFileUploadMutation } from '~/query/file-upload-api';
import { ModalParams } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const UploadImageModal = ({ params }: { params?: ModalParams<'uploadImage'> }) => {
    const { isOpen, onClose } = useModalContext();
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [localFile, setLocalFile] = useState<File | null>(null);
    const [localPreview, setLocalPreview] = useState(params?.preview);
    const [uploadFile] = useFileUploadMutation();

    const handleUpload = async () => {
        if (!localFile) return;

        const formData = new FormData();
        formData.append('file', localFile);

        try {
            const data = await uploadFile(formData).unwrap();
            params?.onSave(data.url);
            onClose();
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

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

    const handleCancel = () => {
        params?.onSave('');
        onClose();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (uploadInputRef.current) {
                uploadInputRef.current.click();
            }
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (!params) return null;

    return (
        <UiModal
            data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL}
            isOpen={isOpen}
            onClose={onClose}
            header='Изображение'
            maxW='396px'
            body={
                <Box
                    data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL_IMAGE_BLOCK}
                    cursor='pointer'
                    overflow='hidden'
                    pb={2}
                    pt={4}
                >
                    <input
                        data-test-id={params.testId}
                        style={{ display: 'none' }}
                        type='file'
                        ref={uploadInputRef}
                        onChange={(e) => handleFileChange(e)}
                    />
                    <Image
                        borderRadius='8px'
                        onClick={() => uploadInputRef.current?.click()}
                        data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL_PREVIEW_IMAGE}
                        mx='auto'
                        h='206px'
                        w='206px'
                        src={localPreview}
                        cursor='pointer'
                        objectFit='cover'
                        alt='Загруженное изображение'
                    />
                </Box>
            }
            footer={
                localPreview !== default_image && (
                    <Grid w='100%' gap={4}>
                        <UiButton
                            onClick={handleUpload}
                            size='lg'
                            variant='solid'
                            text='Сохранить'
                        />
                        <UiButton onClick={handleCancel} size='lg' variant='ghost' text='Удалить' />
                    </Grid>
                )
            }
        />
    );
};
