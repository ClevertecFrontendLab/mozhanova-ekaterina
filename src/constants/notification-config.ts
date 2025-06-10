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
    RECIPE_NOT_FOUND_ERROR: 'Рецепт не найден',
    CREATE_RECIPE_SUCCESS: 'Рецепт успешно опубликован.',
    CREATE_RECIPE_DRAFT_SUCCESS: 'Черновик успешно сохранен.',
    DELETE_RECIPE_SUCCESS: 'Рецепт успешно удален.',
};

const NOTIFICATION_DESCRIPTIONS = {
    RECIPE_EXISTS_ERROR: 'Рецепт с таким названием уже существует.',
    UPLOAD_IMAGE_ERROR: 'Попробуйте сохранить фото позже.',
    GET_RECIPES_ERROR: 'Попробуйте поискать снова попозже',
    DELETE_RECIPE_ERROR: 'Не удалось удалить рецепт.',
    CREATE_RECIPE_ERROR: 'Попробуйте пока сохранить в черновик.',
    SAVE_DRAFT_ERROR: 'Не удалось сохранить черновик рецепта.',
    SERVER_ERROR: 'Попробуйте немного позже.',
    EMAIL_NOT_FOUND: 'Попробуйте другой e-mail или проверьте правильность его написания',
    EMAIL_NOT_VERIFIED: 'Проверьте почту и перейдите по ссылке',
    TRY_AGAIN: 'Попробуйте снова',
};

export const NOTIFICATION_MESSAGES = {
    VERIFICATION_SUCCESS: {
        title: NOTIFICATION_TITLES.VERIFICATION_SUCCESS,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    INVALID_CREDENTIALS: {
        title: NOTIFICATION_TITLES.INVALID_CREDENTIALS,
        description: NOTIFICATION_DESCRIPTIONS.TRY_AGAIN,
        duration: NotificationDuration.Long,
        position: 'bottom-left',
    },
    EMAIL_NOT_VERIFIED: {
        title: NOTIFICATION_TITLES.EMAIL_NOT_VERIFIED,
        description: NOTIFICATION_DESCRIPTIONS.EMAIL_NOT_VERIFIED,
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
        description: NOTIFICATION_DESCRIPTIONS.EMAIL_NOT_FOUND,
        duration: NotificationDuration.Long,
    },
    SERVER_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.SERVER_ERROR,
        duration: NotificationDuration.Long,
    },
    UPLOAD_IMAGE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.UPLOAD_IMAGE_ERROR,
        duration: NotificationDuration.Long,
    },
    GET_RECIPES_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.GET_RECIPES_ERROR,
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
        description: NOTIFICATION_DESCRIPTIONS.RECIPE_EXISTS_ERROR,
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.CREATE_RECIPE_ERROR,
        duration: NotificationDuration.Long,
    },
    SAVE_DRAFT_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.SAVE_DRAFT_ERROR,
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_DRAFT_SUCCESS: {
        title: NOTIFICATION_TITLES.CREATE_RECIPE_DRAFT_SUCCESS,
        duration: NotificationDuration.Long,
    },
    CREATE_RECIPE_SUCCESS: {
        title: NOTIFICATION_TITLES.CREATE_RECIPE_SUCCESS,
        duration: NotificationDuration.Long,
    },
    DELETE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.DELETE_RECIPE_ERROR,
        duration: NotificationDuration.Long,
    },
    DELETE_RECIPE_SUCCESS: {
        title: NOTIFICATION_TITLES.DELETE_RECIPE_SUCCESS,
        duration: NotificationDuration.Long,
    },
    RECIPE_NOT_FOUND_ERROR: {
        title: NOTIFICATION_TITLES.RECIPE_NOT_FOUND_ERROR,
        duration: NotificationDuration.Long,
    },
} as const satisfies Record<string, NotificationMessage>;
