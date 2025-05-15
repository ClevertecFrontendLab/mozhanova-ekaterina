import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { EmailErrorModal } from '~/components/modals/EmailErrorModal';
import { EmailSentModal } from '~/components/modals/EmailSentModal';
import { ForgotModal } from '~/components/modals/ForgotModal';
import { LoginErrorModal } from '~/components/modals/LoginErrorModal';
import { OtpModal } from '~/components/modals/OtpModal';
import { RecoveryFormModal } from '~/components/modals/RecoveryFormModal';

type ModalType =
    | 'emailSent'
    | 'emailError'
    | 'showRecoveryForgot'
    | 'recoveryOtp'
    | 'recoveryForm'
    | 'loginError';

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [modalState, setModalState] = useState('');

    const showEmailSent = (email: string) => {
        setModalType('emailSent');
        setModalState(email);
        onOpen();
    };

    const showEmailError = () => {
        setModalType('emailError');
        onOpen();
    };

    const showRecoveryForgot = () => {
        setModalType('showRecoveryForgot');
        onOpen();
    };
    const showRecoveryOtp = (email: string) => {
        setModalType('recoveryOtp');
        setModalState(email);
        onOpen();
    };

    const showRecoveryForm = () => {
        setModalType('recoveryForm');
        onOpen();
    };

    const showLoginError = () => {
        setModalType('loginError');
        onOpen();
    };

    const ModalComponent = () => {
        switch (modalType) {
            case 'emailSent':
                return <EmailSentModal email={modalState} onClose={onClose} isOpen={isOpen} />;

            case 'emailError':
                return <EmailErrorModal isOpen={isOpen} onClose={onClose} />;

            case 'showRecoveryForgot':
                return <ForgotModal isOpen={isOpen} onClose={onClose} next={showRecoveryOtp} />;

            case 'recoveryOtp':
                return (
                    <OtpModal
                        isOpen={isOpen}
                        onClose={onClose}
                        email={modalState}
                        next={showRecoveryForm}
                    />
                );

            case 'recoveryForm':
                return <RecoveryFormModal isOpen={isOpen} onClose={onClose} />;

            case 'loginError':
                return <LoginErrorModal isOpen={isOpen} onClose={onClose} />;
        }
    };

    return {
        ModalComponent,
        showEmailSent,
        showLoginError,
        showEmailError,
        showRecoveryForgot,
        showRecoveryOtp,
        showRecoveryForm,
        onClose,
        isOpen,
        modalState,
    };
};
