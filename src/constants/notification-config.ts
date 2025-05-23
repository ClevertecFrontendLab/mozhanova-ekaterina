import { NotificationDuration } from '~/hooks/use-toast';
import { NotificationMessage } from '~/types';

export const NOTIFICATION_MESSAGES = {
    VERIFICATION_SUCCESS: {
        title: 'Верификация прошла успешно',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    INVALID_CREDENTIALS: {
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_NOT_VERIFIED: {
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_EXISTS: {
        title: 'Пользователь с таким email уже существует.',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    LOGIN_EXISTS: {
        title: 'Пользователь с таким login уже существует.',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_NOT_FOUND: {
        title: 'Такого e-mail нет',
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        duration: NotificationDuration.Long,
    },
    SERVER_ERROR: {
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    GET_RECIPES_ERROR: {
        title: 'Ошибка сервера',
        description: 'Попробуйте поискать снова попозже',
    },
    RESET_CREDENTIALS_SUCCESS: {
        title: 'Восстановление данных успешно',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    AUTH_ERROR: {
        title: 'Авторизация не прошла',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
} as const satisfies Record<string, NotificationMessage>;
