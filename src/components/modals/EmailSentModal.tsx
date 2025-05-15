import { Link } from '@chakra-ui/react';

import { UiModal } from '../ui/UiModal';

export const EmailSentModal = ({
    isOpen,
    onClose,
    email,
}: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}) => (
    <UiModal
        image='/src/assets/modals/2.png'
        isOpen={isOpen}
        onClose={onClose}
        header='Остался последний шаг. Нужно верифицировать ваш e-mail'
        body={
            <p>
                Мы отправили вам на почту <b>{email}</b> ссылку для верификации.
            </p>
        }
        footer={
            <p>
                Не пришло письмо? Проверьте папку Спам.По другим вопросам свяжитесь
                <Link textDecoration='underline' href='#'>
                    <wbr /> с поддержкой
                </Link>
            </p>
        }
    />
);
