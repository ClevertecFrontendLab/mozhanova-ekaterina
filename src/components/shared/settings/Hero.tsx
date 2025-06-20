import { Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import avatar_default from '~/assets/ui/avatar_default.png';
import { UiAvatar } from '~/components/ui/UiAvatar';
import { useModalContext } from '~/contexts/modal-context';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useUploadUserPhotoMutation } from '~/query/user-api';

type Props = {
    avatar?: string;
};

export const Hero = ({ avatar }: Props) => {
    const [preview, setPreview] = useState(avatar ? `${API_IMAGE_URL}${avatar}` : avatar_default);
    const { showUploadImage, onClose } = useModalContext();
    const [uploadUserPhoto] = useUploadUserPhotoMutation();

    const handleUpload = async (formData: FormData) => {
        try {
            const data = await uploadUserPhoto(formData).unwrap();
            setPreview(`${API_IMAGE_URL}${data.photoLink}`);
            onClose();
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const showModal = () => {
        showUploadImage({
            preview,
            testId: '',
            handleUpload: handleUpload,
            title: (
                <>
                    <p>Изменить</p>
                    <p>изображение профиля</p>
                </>
            ),
            uploadButton: 'Кадрировать и сохранить',
        });
    };

    return (
        <Flex direction={{ base: 'column' }} gap={4}>
            <Heading fontSize={{ base: '18px', md: '20px' }}>Авторизация и персонализация</Heading>
            <UiAvatar
                src={preview}
                alignSelf={{ base: 'center', md: 'flex-start' }}
                badge
                onBadgeClick={showModal}
            />
        </Flex>
    );
};
