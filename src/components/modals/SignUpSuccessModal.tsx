import { Link } from '@chakra-ui/react';

import image from '~/assets/modals/2.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';

import { UiModal } from '../ui/UiModal';

export const SignUpSuccessModal = ({
    isOpen,
    onClose,
    email,
}: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}) => (
    <UiModal
        data-test-id={DATA_TEST_IDS.SIGN_UP_SUCCESS_MODAL}
        image={image}
        isOpen={isOpen}
        onClose={onClose}
        header='Остался последний шаг. Нужно верифицировать ваш e-mail'
        body={
            <>
                <p>Мы отправили вам на почту</p>
                <p>
                    <b>{email}</b>
                </p>
                <p>ссылку для верификации.</p>
            </>
        }
        footer={
            <>
                <p>Не пришло письмо? Проверьте папку Спам.</p>
                <p>
                    По другим вопросам свяжитесь
                    <Link textDecoration='underline' href='#'>
                        <wbr /> с поддержкой
                    </Link>
                </p>
            </>
        }
    />
);
