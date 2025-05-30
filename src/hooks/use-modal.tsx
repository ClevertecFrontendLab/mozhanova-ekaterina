import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

import { modalConfig } from '~/constants/modal-config';
import { AuthUser, ModalParams, ModalState, ModalType, RecipeDraft } from '~/types';

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalState, setModalState] = useState<ModalState | null>(null);

    const showModal = <T extends ModalType>(type: T, params: ModalParams<T>) => {
        setModalState({ type, params });
        onOpen();
    };

    const showSignUpSuccess = (email: string) => showModal('signUpSuccess', { email });

    const showVerificationFailed = () => showModal('verificationFailed', undefined);

    const showSendEmail = () => showModal('sendEmail', undefined);

    const showVerificationCode = (email: string) => showModal('verificationCode', { email });

    const showResetCredentials = (email: string) => showModal('resetCredentials', { email });

    const showSignInError = (userData: AuthUser) => showModal('signInError', { userData });

    const showUploadImage = (params: ModalParams<'uploadImage'>) =>
        showModal('uploadImage', { ...params });

    const showRecipePreventive = (draft: RecipeDraft, link: string) =>
        showModal('recipePreventive', { draft, link });

    const handleClose = () => {
        setModalState(null);
        onClose();
    };

    const ModalComponent = () => {
        if (!modalState) return null;

        const modalConfigItem = modalConfig.find((modal) => modal.type === modalState.type);

        if (!modalConfigItem) return null;

        return React.cloneElement(modalConfigItem.component, {
            params: modalState.params,
        });
    };

    return {
        isOpen,
        onClose: handleClose,
        ModalComponent,
        showSignUpSuccess,
        showSignInError,
        showVerificationFailed,
        showSendEmail,
        showVerificationCode,
        showResetCredentials,
        showUploadImage,
        showRecipePreventive,
    };
};
