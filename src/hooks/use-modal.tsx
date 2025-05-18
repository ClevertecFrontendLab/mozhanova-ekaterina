import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { ResetCredentialsModal } from '~/components/modals/ResetCredentialsModal';
import { SendEmailModal } from '~/components/modals/SendEmailModal';
import { SignInErrorModal } from '~/components/modals/SignInErrorModal';
import { SignUpSuccessModal } from '~/components/modals/SignUpSuccessModal';
import { VerificationCodeModal } from '~/components/modals/VerificationCodeModal';
import { VerificationFailedModal } from '~/components/modals/VerificationFailedModal';

type ModalType =
    | 'signUpSuccess'
    | 'verificationFailed'
    | 'sendEmail'
    | 'verificationCode'
    | 'resetCredentials'
    | 'signInError';

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [modalState, setModalState] = useState('');

    const showSignUpSuccess = (email: string) => {
        setModalType('signUpSuccess');
        setModalState(email);
        onOpen();
    };

    const showVerificationFailed = () => {
        setModalType('verificationFailed');
        onOpen();
    };

    const showSendEmail = () => {
        setModalType('sendEmail');
        onOpen();
    };
    const showVerificationCode = (email: string) => {
        setModalType('verificationCode');
        setModalState(email);
        onOpen();
    };

    const showResetCredentials = (email: string) => {
        setModalType('resetCredentials');
        setModalState(email);
        onOpen();
    };

    const showSignInError = (userData: { login: string; password: string }) => {
        setModalType('signInError');
        setModalState(JSON.stringify(userData));
        onOpen();
    };

    const ModalComponent = () => {
        switch (modalType) {
            case 'signUpSuccess':
                return <SignUpSuccessModal email={modalState} onClose={onClose} isOpen={isOpen} />;

            case 'verificationFailed':
                return <VerificationFailedModal isOpen={isOpen} onClose={onClose} />;

            case 'sendEmail':
                return (
                    <SendEmailModal isOpen={isOpen} onClose={onClose} next={showVerificationCode} />
                );

            case 'verificationCode':
                return (
                    <VerificationCodeModal
                        isOpen={isOpen}
                        onClose={onClose}
                        email={modalState}
                        next={showResetCredentials}
                    />
                );

            case 'resetCredentials':
                return (
                    <ResetCredentialsModal isOpen={isOpen} onClose={onClose} email={modalState} />
                );

            case 'signInError':
                return (
                    <SignInErrorModal
                        userData={JSON.parse(modalState)}
                        isOpen={isOpen}
                        onClose={onClose}
                        next={showSignInError}
                    />
                );
        }
    };

    return {
        ModalComponent,
        showSignUpSuccess,
        showSignInError,
        showVerificationFailed,
        showSendEmail,
        showVerificationCode,
        showResetCredentials,
        onClose,
        isOpen,
        modalState,
    };
};
