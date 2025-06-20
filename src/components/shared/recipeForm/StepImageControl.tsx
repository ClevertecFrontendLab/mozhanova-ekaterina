import { Box, Image } from '@chakra-ui/react';

import default_image from '~/assets/ui/image_default.png';
import { useModalContext } from '~/contexts/modal-context';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useFileUploadMutation } from '~/query/file-upload-api';

type Props = {
    index: number;
    error: boolean;
    value?: string | null;
    onChange: (image: string) => void;
};

export const StepImageControl = ({ index, error, value, onChange }: Props) => {
    const { showUploadImage, onClose } = useModalContext();
    const preview = value ? `${API_IMAGE_URL}${value}` : default_image;
    const [uploadFile] = useFileUploadMutation();

    const handleUpload = async (formData: FormData) => {
        try {
            const data = await uploadFile(formData).unwrap();
            onChange!(data.url);
            onClose();
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const showUploadImageModal = () => {
        showUploadImage({
            preview,
            onChange: onChange,
            testId: `recipe-steps-image-block-${index}-input-file`,
            handleUpload: handleUpload,
        });
    };

    return (
        <Box
            data-test-id={`recipe-steps-image-block-${index}`}
            borderColor={error ? 'red.400' : 'border.light'}
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
        >
            <Image
                data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                w={{ base: '100%', sm: '346px' }}
                h='100%'
                cursor='pointer'
                src={preview}
                onClick={showUploadImageModal}
                objectFit='cover'
                alt='Загруженное изображение'
                borderRadius='8px'
            />
        </Box>
    );
};
