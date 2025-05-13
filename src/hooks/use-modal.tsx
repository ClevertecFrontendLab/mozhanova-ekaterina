import { Link, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { UiButton } from '~/components/ui/UiButton';
import { UiModal } from '~/components/ui/UiModal';

type ModalType = 'emailSent' | 'emailError' | 'recovery' | 'loginError' | null;

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalData, setModalData] = useState<string>('');

    const showEmailSent = (email: string) => {
        setModalType('emailSent');
        setModalData(email);
        onOpen();
    };

    const showEmailError = () => {
        setModalType('emailError');
        onOpen();
    };

    const showRecovery = () => {
        setModalType('recovery');
        onOpen();
    };

    const showLoginError = () => {
        setModalType('loginError');
        onOpen();
    };

    const ModalComponent = () => {
        switch (modalType) {
            case 'emailSent':
                return (
                    <UiModal
                        image='/src/assets/modals/2.png'
                        isOpen={isOpen}
                        onClose={onClose}
                        header='Остался последний шаг. Нужно верифицировать ваш e-mail'
                        body={
                            <p>
                                Мы отправили вам на почту <b>{modalData}</b> ссылку для верификации.
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

            case 'emailError':
                return (
                    <UiModal
                        image='/src/assets/modals/1.png'
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
                    />
                );

            case 'recovery':
                return (
                    <UiModal
                        image='/src/assets/modals/3.png'
                        isOpen={isOpen}
                        onClose={onClose}
                        body='Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код'
                        footer='Не пришло письмо? Проверьте папку Спам.'
                    />
                );

            case 'loginError':
                return (
                    <UiModal
                        image='/src/assets/modals/3.png'
                        isOpen={isOpen}
                        onClose={onClose}
                        header='Вход не выполнен'
                        body='Что-то пошло не так. Попробуйте еще раз'
                        footer={
                            <UiButton type='submit' variant='solid' text='Повторить' size='lg' />
                        }
                    />
                );

            default:
                return null;
        }
    };

    return {
        ModalComponent,
        showEmailSent,
        showEmailError,
        showRecovery,
        showLoginError,
    };
};
