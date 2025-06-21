import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import avatar_default from '~/assets/ui/avatar_default.png';
import { UiAvatar } from '~/components/ui/UiAvatar';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useUploadUserPhotoMutation } from '~/query/user-api';

import { SectionTitle } from './SectionTitle';

type Props = {
    avatar?: string;
};

export const Hero = ({ avatar }: Props) => {
    const [preview, setPreview] = useState(avatar ? `${API_IMAGE_URL}${avatar}` : avatar_default);
    const { showUploadImage, onClose } = useModalContext();
    const [uploadUserPhoto] = useUploadUserPhotoMutation();
    const { showError } = useToast();

    const handleUpload = async (formData: FormData) => {
        try {
            const data = await uploadUserPhoto(formData).unwrap();
            setPreview(`${API_IMAGE_URL}${data.photoLink}`);
            onClose();
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
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
            enableCrop: true,
        });
    };

    return (
        <Flex direction={{ base: 'column' }} gap={4}>
            <SectionTitle>Авторизация и персонализация</SectionTitle>
            <UiAvatar
                src={preview}
                alignSelf={{ base: 'center', md: 'flex-start' }}
                badge
                onBadgeClick={showModal}
            />
        </Flex>
    );
};
