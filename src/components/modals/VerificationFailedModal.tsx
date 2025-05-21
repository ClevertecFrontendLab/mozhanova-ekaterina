import { Link } from '@chakra-ui/react';

import image from '~/assets/modals/1.png';

import { UiModal } from '../ui/UiModal';

export const VerificationFailedModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => (
    <UiModal
        image={image}
        isOpen={isOpen}
        onClose={onClose}
        header='Упс! Что-то пошло не так'
        body='Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.'
        footer={
            <p>
                Остались вопросы? Свяжитесь с поддержкой
                <Link textDecoration='underline' href='#'>
                    <wbr /> с поддержкой
                </Link>
            </p>
        }
        data-test-id='email-verification-failed-modal'
    />
);
