import { UseFormSetError } from 'react-hook-form';

import { ERROR_CONFIGS } from '~/constants/error-config';
import { useModalContext } from '~/contexts/modal-context';
import { useToast } from '~/hooks/use-toast';
import { AuthUser, ErrorConfig, ErrorResponse, ErrorStatus, FormInputs } from '~/types';

export const useErrorHandlers = () => {
    const { showSignInError } = useModalContext();
    const { showError } = useToast();

    const errorHandler = (
        error: ErrorResponse,
        config: ErrorConfig,
        setError?: UseFormSetError<FormInputs>,
        userData?: AuthUser,
        setHeaderText?: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        const errorCase = config[error.status as ErrorStatus | 'default'] || config.default;

        if (errorCase?.toast) {
            showError(errorCase.toast);
        }

        if (errorCase?.setErrorFields && setError) {
            errorCase.setErrorFields.forEach((field) => setError?.(field, { message: '' }));
        }

        if (errorCase?.modal) {
            if (errorCase.modal === 'showSignInError' && userData) {
                showSignInError(userData);
            }
        }
        if (errorCase?.setHeaderText && setHeaderText) {
            setHeaderText(errorCase.setHeaderText);
        }
    };

    return {
        loginErrorHandler: (
            error: ErrorResponse,
            userData: AuthUser,
            setError?: UseFormSetError<FormInputs>,
        ) => {
            errorHandler(error, ERROR_CONFIGS.LOGIN_ERRORS, setError, userData);
        },
        signUpErrorHandler: (error: ErrorResponse) => {
            errorHandler(error, ERROR_CONFIGS.SIGNUP_ERRORS);
        },
        sendEmailErrorHandler: (error: ErrorResponse, setError: UseFormSetError<FormInputs>) => {
            errorHandler(error, ERROR_CONFIGS.SEND_EMAIL_ERRORS, setError);
        },
        verificationCodeErrorHandler: (
            error: ErrorResponse,
            setError: UseFormSetError<FormInputs>,
            setHeaderText: React.Dispatch<React.SetStateAction<string>>,
        ) => {
            errorHandler(
                error,
                ERROR_CONFIGS.VERIFICATION_CODE_ERRORS,
                setError,
                undefined,
                setHeaderText,
            );
        },
        resetCredentialsErrorHandler: (error: ErrorResponse) => {
            errorHandler(error, ERROR_CONFIGS.RESET_CREDENTIALS_ERRORS);
        },
    };
};
