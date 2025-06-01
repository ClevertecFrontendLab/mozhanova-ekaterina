import { NotificationDuration } from '~/hooks/use-toast';
import { NotificationMessage } from '~/types';

const NOTIFICATION_TITLES = {
    ERROR: 'Ошибка',
    SERVER_ERROR: 'Ошибка сервера',
    VERIFICATION_SUCCESS: 'Верификация прошла успешно',
    INVALID_CREDENTIALS: 'Неверный логин или пароль',
    EMAIL_NOT_VERIFIED: 'E-mail не верифицирован',
    EMAIL_EXISTS: 'Пользователь с таким email уже существует.',
    LOGIN_EXISTS: 'Пользователь с таким login уже существует.',
    EMAIL_NOT_FOUND: 'Такого e-mail нет',
    RESET_CREDENTIALS_SUCCESS: 'Восстановление данных успешно',
    AUTH_ERROR: 'Авторизация не прошла',
};

export const NOTIFICATION_MESSAGES = {
    VERIFICATION_SUCCESS: {
        title: NOTIFICATION_TITLES.VERIFICATION_SUCCESS,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    INVALID_CREDENTIALS: {
        title: NOTIFICATION_TITLES.INVALID_CREDENTIALS,
        description: 'Попробуйте снова',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_NOT_VERIFIED: {
        title: NOTIFICATION_TITLES.EMAIL_NOT_VERIFIED,
        description: 'Проверьте почту и перейдите по ссылке',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_EXISTS: {
        title: NOTIFICATION_TITLES.EMAIL_EXISTS,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    LOGIN_EXISTS: {
        title: NOTIFICATION_TITLES.LOGIN_EXISTS,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_NOT_FOUND: {
        title: NOTIFICATION_TITLES.EMAIL_NOT_FOUND,
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        duration: NotificationDuration.Long,
    },
    SERVER_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Попробуйте немного позже',
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    UPLOAD_IMAGE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Попробуйте сохранить фото позже.',
        duration: NotificationDuration.Long,
    },
    GET_RECIPES_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Попробуйте поискать снова попозже',
        duration: NotificationDuration.Long,
    },
    RESET_CREDENTIALS_SUCCESS: {
        title: NOTIFICATION_TITLES.RESET_CREDENTIALS_SUCCESS,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    AUTH_ERROR: {
        title: NOTIFICATION_TITLES.AUTH_ERROR,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    RECIPE_EXISTS_ERROR: {
        title: NOTIFICATION_TITLES.ERROR,
        description: 'Рецепт с таким названием уже существует.',
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Попробуйте пока сохранить в черновик.',
        duration: NotificationDuration.Long,
    },
    SAVE_DRAFT_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Не удалось сохранить черновик рецепта.',
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_DRAFT_SUCCESS: {
        title: 'Черновик успешно сохранен.',
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_SUCCESS: {
        title: 'Рецепт успешно опубликован.',
        duration: NotificationDuration.Long,
    },
    DELETE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: 'Не удалось удалить рецепт.',
        duration: NotificationDuration.Long,
    },
    DELETE_RECIPE_SUCCESS: {
        title: 'Рецепт успешно удален.',
        duration: NotificationDuration.Long,
    },
    RECIPE_NOT_FOUND_ERROR: {
        title: 'Рецепт не найден',
        duration: NotificationDuration.Long,
    },
} as const satisfies Record<string, NotificationMessage>;
