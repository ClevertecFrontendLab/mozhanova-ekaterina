import { Box, Grid, Image } from '@chakra-ui/react';
import { useState } from 'react';

import default_image from '~/assets/ui/image_default.png';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { useFileUploadMutation } from '~/query/file-upload-api';
import { ModalParams } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const UploadImageModal = ({ params }: { params?: ModalParams<'uploadImage'> }) => {
    const { isOpen, onClose } = useModalContext();
    const [preview, setPreview] = useState(params!.initialImage);
    const [file, setFile] = useState<File | null>(null);
    const { showError } = useToast();
    const [uploadFile] = useFileUploadMutation();

    const handleUploadImage = async () => {
        const formData = new FormData();
        if (!file) return;
        formData.append('file', file);

        try {
            const data = await uploadFile(formData).unwrap();
            params!.onChange(data.url);
            onClose();
        } catch {
            showError(NOTIFICATION_MESSAGES.UPLOAD_IMAGE_ERROR);
            onClose();
        }
    };

    const handleFileChange = (element: HTMLInputElement) => {
        const file = element.files?.[0];

        if (!file) return;
        setFile(file);
        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleResetImage = () => {
        setPreview(default_image);
        setFile(null);
    };

    return (
        <UiModal
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
                        style={{ display: 'none' }}
                        type='file'
                        ref={params!.uploadInputRef}
                        onChange={(e) => handleFileChange(e.target)}
                    />
                    <Image
                        borderRadius='8px'
                        onClick={() => params!.uploadInputRef?.current?.click()}
                        data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL_PREVIEW_IMAGE}
                        mx='auto'
                        h='206px'
                        w='206px'
                        src={preview}
                        cursor='pointer'
                        objectFit='cover'
                        alt='Загруженное изображение'
                    />
                </Box>
            }
            footer={
                preview !== default_image && (
                    <Grid w='100%' gap={4}>
                        <UiButton
                            onClick={handleUploadImage}
                            size='lg'
                            variant='solid'
                            text='Сохранить'
                        />
                        <UiButton
                            onClick={handleResetImage}
                            size='lg'
                            variant='ghost'
                            text='Удалить'
                        />
                    </Grid>
                )
            }
        />
    );
};
