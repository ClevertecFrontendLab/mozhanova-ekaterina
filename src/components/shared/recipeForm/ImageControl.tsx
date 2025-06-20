import { Box, Image } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';

import default_image from '~/assets/ui/image_default.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useFileUploadMutation } from '~/query/file-upload-api';
import { Recipe } from '~/types';

type Props = {
    error: boolean;
    control: Control<Recipe>;
};

export const ImageControl = ({ control, error }: Props) => {
    const { showUploadImage, onClose } = useModalContext();
    const [uploadFile] = useFileUploadMutation();

    const {
        field: { value, onChange },
    } = useController({
        control,
        name: 'image',
    });

    const preview = value ? `${API_IMAGE_URL}${value}` : default_image;

    const handleUpload = async (formData: FormData) => {
        try {
            const data = await uploadFile(formData).unwrap();
            onChange!(data.url);
            onClose();
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const showModal = () => {
        showUploadImage({
            preview,
            onChange: onChange,
            testId: DATA_TEST_IDS.RECIPE_IMAGE_INPUT,
            handleUpload: handleUpload,
        });
    };

    return (
        <Box
            data-test-id={DATA_TEST_IDS.RECIPE_IMAGE_BLOCK}
            borderColor={error ? 'red.400' : 'transparent'}
            borderWidth='1px'
            borderRadius='8px'
            h='fit-content'
        >
            <Image
                borderRadius='8px'
                data-test-id={DATA_TEST_IDS.RECIPE_PREVIEW_IMAGE}
                maxH={{ sm: '224px', md: 'unset' }}
                w={{ base: '100%', sm: '232px', md: '353px', lg: '553px' }}
                cursor='pointer'
                src={preview}
                onClick={showModal}
                objectFit='cover'
                alt='Загруженное изображение'
            />
        </Box>
    );
};
