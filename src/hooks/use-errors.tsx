import { UseFormSetError } from 'react-hook-form';

import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useModalContext } from '~/contexts/modal-context';
import { NotificationDuration, useToast } from '~/hooks/use-toast';
import { AuthUser, ErrorResponse, FormInputs } from '~/types';

export const useErrors = () => {
    const { showError } = useToast();
    const { showSignInError } = useModalContext();

    const signUpErrorHandler = (error: ErrorResponse) => {
        switch (error.status) {
            case 400:
                showError({
                    title: error.data?.message,
                    duration: NotificationDuration.Long,
                    position: 'bottom-left',
                });
                break;

            default:
                showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
                break;
        }
    };

    const signInErrorHandler = (
        error: ErrorResponse,
        setError: UseFormSetError<FormInputs>,
        userData: AuthUser,
    ) => {
        switch (error.status) {
            case 401:
                setError('login', { message: '' });
                setError('password', { message: '' });
                showError(NOTIFICATION_MESSAGES.INVALID_CREDENTIALS);
                break;
            case 403:
                setError('login', { message: '' });
                setError('password', { message: '' });
                showError(NOTIFICATION_MESSAGES.EMAIL_NOT_VERIFIED);
                break;
            default:
                showSignInError(userData);
                break;
        }
    };

    const signInErrorModalHandler = (error: ErrorResponse, userData: AuthUser) => {
        switch (error.status) {
            case 401:
                showError(NOTIFICATION_MESSAGES.INVALID_CREDENTIALS);
                break;
            case 403:
                showError(NOTIFICATION_MESSAGES.EMAIL_NOT_VERIFIED);
                break;
            default:
                showSignInError(userData);
                break;
        }
    };

    const verificationCodeErrorHandler = (
        error: ErrorResponse,
        setError: UseFormSetError<FormInputs>,
        setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        switch (error.status) {
            case 403:
                setError('code', { message: '' });
                setHeaderText('Неверный код');
                break;

            default:
                showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
                break;
        }
    };

    const sendEmailErrorHandler = (
        error: ErrorResponse,
        setError: UseFormSetError<FormInputs>,
        reset: () => void,
    ) => {
        switch (error.status) {
            case 403:
                reset();
                showError(NOTIFICATION_MESSAGES.EMAIL_NOT_FOUND);
                break;

            default:
                reset();
                showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
                break;
        }
        setError('email', { message: '' });
    };

    const resetCredentialsErrorHandler = () => {
        showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
    };

    const createRecipeErrorHandler = (error: ErrorResponse) => {
        switch (error.status) {
            case 409:
                showError(NOTIFICATION_MESSAGES.RECIPE_EXISTS_ERROR);
                break;
            default:
                showError(NOTIFICATION_MESSAGES.CREATE_RECIPE_ERROR);
                break;
        }
    };

    const createDraftRecipeErrorHandler = (error: ErrorResponse) => {
        switch (error.status) {
            case 409:
                showError(NOTIFICATION_MESSAGES.RECIPE_EXISTS_ERROR);
                break;
            default:
                showError(NOTIFICATION_MESSAGES.SAVE_DRAFT_ERROR);
                break;
        }
    };

    const deleteRecipeErrorHandler = (error: ErrorResponse) => {
        switch (error.status) {
            case 404:
                showError(NOTIFICATION_MESSAGES.RECIPE_NOT_FOUND_ERROR);
                break;
            default:
                showError(NOTIFICATION_MESSAGES.DELETE_RECIPE_ERROR);
                break;
        }
    };

    const saveLikeRecipeErrorHandler = (error: ErrorResponse) => {
        switch (error.status) {
            case 404:
                showError(NOTIFICATION_MESSAGES.RECIPE_NOT_FOUND_ERROR);
                break;
            default:
                showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
                break;
        }
    };

    return {
        signUpErrorHandler,
        signInErrorHandler,
        verificationCodeErrorHandler,
        signInErrorModalHandler,
        sendEmailErrorHandler,
        resetCredentialsErrorHandler,
        createRecipeErrorHandler,
        createDraftRecipeErrorHandler,
        deleteRecipeErrorHandler,
        saveLikeRecipeErrorHandler,
    };
};
