import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

import { modalConfig } from '~/constants/modal-config';
import { Auth, ModalParams, ModalState, ModalType } from '~/types';

export const useModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalState, setModalState] = useState<ModalState | null>(null);

    const showModal = <T extends ModalType>(type: T, params: ModalParams<T>) => {
        setModalState({ type, params });
        onOpen();
    };

    const showSignUpSuccess = (params: ModalParams<'signUpSuccess'>) =>
        showModal('signUpSuccess', params);

    const showVerificationFailed = () => showModal('verificationFailed', undefined);

    const showSendEmail = () => showModal('sendEmail', undefined);

    const showVerificationCode = (params: ModalParams<'verificationCode'>) =>
        showModal('verificationCode', params);

    const showResetCredentials = (params: ModalParams<'resetCredentials'>) =>
        showModal('resetCredentials', params);

    const showSignInError = (userData: Auth) => showModal('signInError', { userData });

    const showUploadImage = (params: ModalParams<'uploadImage'>) =>
        showModal('uploadImage', params);

    const showRecipePreventive = (params: ModalParams<'recipePreventive'>) =>
        showModal('recipePreventive', params);

    const showUpdatePassword = () => showModal('updatePassword', undefined);

    const showDeleteProfile = (params: ModalParams<'deleteProfile'>) =>
        showModal('deleteProfile', params);

    const handleClose = () => {
        setModalState(null);
        onClose();
    };

    const ModalComponent = () => {
        if (!modalState) return null;

        const modalConfigItem = modalConfig.find((modal) => modal.type === modalState.type);

        if (!modalConfigItem) return null;

        return React.cloneElement(modalConfigItem.component, modalState.params);
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
        showUpdatePassword,
        showDeleteProfile,
    };
};
