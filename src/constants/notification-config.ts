import { NotificationMessage } from '~/types';

export const NOTIFICATION_MESSAGES = {
    VERIFICATION_SUCCESS: {
        title: 'Верификация прошла успешно',
        duration: 15000,
        position: 'bottom-left',
    },
    INVALID_CREDENTIALS: {
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова',
        duration: 15000,
        position: 'bottom-left',
    },
    EMAIL_NOT_VERIFIED: {
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
        duration: 15000,
        position: 'bottom-left',
    },
    EMAIL_EXISTS: {
        title: 'Пользователь с таким email уже существует.',
        duration: 15000,
        position: 'bottom-left',
    },
    EMAIL_NOT_FOUND: {
        title: 'Такого e-mail нет',
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        duration: 15000,
    },
    SERVER_ERROR: {
        title: 'Произошла ошибка',
        description: 'Попробуйте ещё раз',
        duration: 15000,
        position: 'bottom-left',
    },
    RESET_CREDENTIALS_SUCCESS: {
        title: 'Восстановление данных успешно',
        duration: 15000,
        position: 'bottom-left',
    },
    AUTH_ERROR: {
        title: 'Авторизация не прошла',
        duration: 15000,
        position: 'bottom-left',
    },
} as const satisfies Record<string, NotificationMessage>;
