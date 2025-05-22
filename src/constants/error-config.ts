import { ErrorCase, ErrorConfig, ErrorStatus } from '~/types';

import { NOTIFICATION_MESSAGES } from './notification-config';

const DEFAULT_SERVER_ERROR: ErrorCase = {
    toast: NOTIFICATION_MESSAGES.SERVER_ERROR,
};

export const ERROR_CONFIGS = {
    LOGIN_ERRORS: {
        [ErrorStatus.UNAUTHORIZED]: {
            toast: NOTIFICATION_MESSAGES.INVALID_CREDENTIALS,
            setErrorFields: ['login', 'password'],
        },
        [ErrorStatus.FORBIDDEN]: {
            toast: NOTIFICATION_MESSAGES.EMAIL_NOT_VERIFIED,
            setErrorFields: ['login', 'password'],
        },
        default: {
            modal: 'showSignInError',
        },
    },
    SIGNUP_ERRORS: {
        [ErrorStatus.BAD_REQUEST]: {
            toast: NOTIFICATION_MESSAGES.EMAIL_EXISTS,
        },
        default: DEFAULT_SERVER_ERROR,
    },
    SEND_EMAIL_ERRORS: {
        [ErrorStatus.FORBIDDEN]: {
            toast: NOTIFICATION_MESSAGES.EMAIL_NOT_FOUND,
            setErrorFields: ['email'],
        },
        default: DEFAULT_SERVER_ERROR,
    },
    VERIFICATION_CODE_ERRORS: {
        [ErrorStatus.FORBIDDEN]: {
            setHeaderText: 'Неверный код',
            setErrorFields: ['code'],
        },
        default: DEFAULT_SERVER_ERROR,
    },
    RESET_CREDENTIALS_ERRORS: {
        default: DEFAULT_SERVER_ERROR,
    },
} as const satisfies Record<string, ErrorConfig>;
