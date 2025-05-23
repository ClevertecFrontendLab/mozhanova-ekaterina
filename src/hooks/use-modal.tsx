import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { ResetCredentialsModal } from '~/components/modals/ResetCredentialsModal';
import { SendEmailModal } from '~/components/modals/SendEmailModal';
import { SignInErrorModal } from '~/components/modals/SignInErrorModal';
import { SignUpSuccessModal } from '~/components/modals/SignUpSuccessModal';
import { VerificationCodeModal } from '~/components/modals/VerificationCodeModal';
import { VerificationFailedModal } from '~/components/modals/VerificationFailedModal';
import { AuthUser, ModalType } from '~/types';

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

    const showSignInError = (userData: AuthUser) => {
        setModalType('signInError');
        setModalState(JSON.stringify(userData));
        onOpen();
    };

    const ModalComponent = () => {
        switch (modalType) {
            case 'signUpSuccess':
                return <SignUpSuccessModal />;

            case 'verificationFailed':
                return <VerificationFailedModal />;

            case 'sendEmail':
                return <SendEmailModal />;

            case 'verificationCode':
                return <VerificationCodeModal />;

            case 'resetCredentials':
                return <ResetCredentialsModal />;

            case 'signInError':
                return <SignInErrorModal />;
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
