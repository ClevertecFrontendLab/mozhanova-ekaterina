import { Box, Grid, Heading, Image } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';

import default_image from '~/assets/ui/image_default.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { useFileUpload } from '~/hooks/use-file-upload';
import { useImgCropper } from '~/hooks/use-img-cropper';
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
    enableCrop,
}: ModalParams<'uploadImage'>) => {
    const { isOpen, onClose } = useModalContext();
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const { handleFileChange, newPreview, file } = useFileUpload(preview);
    const { getCroppedImage, crop, setCrop, zoom, setZoom, onCropComplete } =
        useImgCropper(newPreview);

    const onSubmit = async () => {
        if (!file) return;

        let fileToUpload = file;

        if (enableCrop) {
            const croppedFile = await getCroppedImage();
            if (croppedFile) {
                fileToUpload = croppedFile;
            }
        }

        const formData = new FormData();

        formData.append('file', fileToUpload);

        handleUpload?.(formData);
    };

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
                    {enableCrop && preview !== default_image ? (
                        <Box
                            position='relative'
                            width='206px'
                            height='206px'
                            mx='auto'
                            borderRadius='8px'
                            overflow='hidden'
                        >
                            <Cropper
                                image={newPreview}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                                cropShape='round'
                                showGrid={false}
                            />
                        </Box>
                    ) : (
                        <Image
                            borderRadius='8px'
                            onClick={() => uploadInputRef.current?.click()}
                            data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_MODAL_PREVIEW_IMAGE}
                            mx='auto'
                            h='206px'
                            w='206px'
                            src={newPreview}
                            cursor='pointer'
                            objectFit='cover'
                            alt='Загруженное изображение'
                        />
                    )}
                </Box>
            }
            footer={
                newPreview !== default_image && (
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
