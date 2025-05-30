import { Link, Text } from '@chakra-ui/react';

import image from '~/assets/modals/1.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useModalContext } from '~/contexts/modal-context';

import { UiModal } from '../ui/UiModal';

export const VerificationFailedModal = () => {
    const { isOpen, onClose } = useModalContext();
    return (
        <UiModal
            maxW={{ base: '316px', md: '396px' }}
            image={image}
            isOpen={isOpen}
            onClose={onClose}
            header='Упс! Что-то пошло не так'
            body={
                <Text color='text.secondary'>
                    <p>Ваша ссылка для верификации </p>
                    <p>недействительна. Попробуйте </p>
                    <p>зарегистрироваться снова.</p>
                </Text>
            }
            footer={
                <p>
                    Остались вопросы? Свяжитесь
                    <Link textDecoration='underline' href='#'>
                        <wbr /> с поддержкой
                    </Link>
                </p>
            }
            data-test-id={DATA_TEST_IDS.EMAIL_VERIFICATION_FAILED_MODAL}
        />
    );
};
