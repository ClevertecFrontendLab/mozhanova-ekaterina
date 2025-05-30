import { Box, Image, ResponsiveValue } from '@chakra-ui/react';
import { useRef } from 'react';

import default_image from '~/assets/ui/image_default.png';
import { useModalContext } from '~/contexts/modal-context';
import { API_IMAGE_URL } from '~/query/constants/api-config';

type Props = {
    index: number;
    error: boolean;
    value?: string;
    onChange: (image: string) => void;
    w?: ResponsiveValue<string>;
    maxH?: ResponsiveValue<string>;
};

export const StepImageControl = ({ index, error, value, onChange, ...props }: Props) => {
    const { showUploadImage } = useModalContext();
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const preview = value ? `${API_IMAGE_URL}${value}` : default_image;

    return (
        <Box
            data-test-id={`recipe-steps-image-block-${index}`}
            borderColor={error ? 'red.400' : 'border.light'}
            borderWidth='1px'
            borderRadius='md'
            overflow='hidden'
            {...props}
        >
            <input
                ref={uploadInputRef}
                style={{ display: 'none' }}
                type='file'
                data-test-id={`recipe-steps-image-block-${index}-input-file`}
            />

            <Image
                data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                w='100%'
                h='100%'
                cursor='pointer'
                src={preview}
                onClick={() => showUploadImage({ initialImage: preview, uploadInputRef, onChange })}
                objectFit='cover'
                alt='Загруженное изображение'
                borderRadius='8px'
            />
        </Box>
    );
};
