import { Box, Grid, Heading, Image } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import default_image from '~/assets/ui/image_default.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useFileUpload } from '~/hooks/use-file-upload';
import { ModalParams } from '~/types';

import { UiButton } from '../ui/UiButton';
import { UiModal } from '../ui/UiModal';

export const UploadImageModal = ({
    preview,
    testId,
    onChange,
    handleUpload,
    title = 'Изображение',
    uploadButton = 'Сохранить',
    cancelButton = 'Удалить',
    // enableCrop,
}: ModalParams<'uploadImage'>) => {
    const { isOpen, onClose } = useModalContext();
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const { handleFileChange, localPreview, onSubmit } = useFileUpload(handleUpload, preview);

    const handleCancel = () => {
        onChange!('');
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

    return (
        <UiModal
            data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL}
            isOpen={isOpen}
            onClose={onClose}
            header={
                <Heading fontSize='inherit' fontWeight={700}>
                    {title}
                </Heading>
            }
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
                        data-test-id={testId}
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
                            onClick={onSubmit}
                            size='lg'
                            variant='solid'
                            text={uploadButton}
                        />
                        {cancelButton && onChange && (
                            <UiButton
                                onClick={handleCancel}
                                size='lg'
                                variant='ghost'
                                text={cancelButton}
                            />
                        )}
                    </Grid>
                )
            }
        />
    );
};
