import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { ResetCredentialsModal } from '~/components/modals/ResetCredentialsModal';
import { SentEmailModal } from '~/components/modals/SentEmailModal';
import { SignInErrorModal } from '~/components/modals/SignInErrorModal';
import { SignUpSuccessModal } from '~/components/modals/SignUpSuccessModal';
import { VerificationCodeModal } from '~/components/modals/VerificationCodeModal';
import { VerificationFailedModal } from '~/components/modals/VerificationFailedModal';

type ModalType =
    | 'signUpSuccess'
    | 'verificationFailed'
    | 'sentEmail'
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

    const showSentEmail = () => {
        setModalType('sentEmail');
        onOpen();
    };
    const showVerificationCode = (email: string) => {
        setModalType('verificationCode');
        setModalState(email);
        onOpen();
    };

    const showResetCredentials = () => {
        setModalType('resetCredentials');
        onOpen();
    };

    const showSignInError = () => {
        setModalType('signInError');
        onOpen();
    };

    const ModalComponent = () => {
        switch (modalType) {
            case 'signUpSuccess':
                return <SignUpSuccessModal email={modalState} onClose={onClose} isOpen={isOpen} />;

            case 'verificationFailed':
                return <VerificationFailedModal isOpen={isOpen} onClose={onClose} />;

            case 'sentEmail':
                return (
                    <SentEmailModal isOpen={isOpen} onClose={onClose} next={showVerificationCode} />
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
                return <ResetCredentialsModal isOpen={isOpen} onClose={onClose} />;

            case 'signInError':
                return <SignInErrorModal isOpen={isOpen} onClose={onClose} />;
        }
    };

    return {
        ModalComponent,
        showSignUpSuccess,
        showSignInError,
        showVerificationFailed,
        showSentEmail,
        showVerificationCode,
        showResetCredentials,
        onClose,
        isOpen,
        modalState,
    };
};
