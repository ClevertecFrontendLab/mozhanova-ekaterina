import { Box, Image, ResponsiveValue } from '@chakra-ui/react';

import default_image from '~/assets/ui/image_default.png';
import { useModalContext } from '~/contexts/modal-context';
import { API_IMAGE_URL } from '~/query/constants/api-config';

type Props = {
    index: number;
    error: boolean;
    value?: string | null;
    onChange: (image: string) => void;
    w?: ResponsiveValue<string>;
    maxH?: ResponsiveValue<string>;
};

export const StepImageControl = ({ index, error, value, onChange, ...props }: Props) => {
    const { showUploadImage } = useModalContext();
    const preview = value ? `${API_IMAGE_URL}${value}` : default_image;

    const showUploadImageModal = () => {
        showUploadImage({
            preview,
            onSave: onChange,
            testId: `recipe-steps-image-block-${index}-input-file`,
        });
    };

    return (
        <Box
            data-test-id={`recipe-steps-image-block-${index}`}
            borderColor={error ? 'red.400' : 'border.light'}
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
            {...props}
        >
            {/* <input
                ref={uploadInputRef}
                style={{ display: 'none' }}
                type='file'
                data-test-id={`recipe-steps-image-block-${index}-input-file`}
            /> */}

            <Image
                data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                w='100%'
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
