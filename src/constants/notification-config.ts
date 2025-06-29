import { NotificationMessage } from '~/types';

export const NOTIFICATION_TITLES = {
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
    CREATE_NOTE_SUCCESS: 'Заметка опубликована.',
    CREATE_RECIPE_DRAFT_SUCCESS: 'Черновик успешно сохранен.',
    DELETE_RECIPE_SUCCESS: 'Рецепт успешно удален.',
    DELETE_NOTE_SUCCESS: 'Заметка удалена.',
    CHANGES_INFO_SUCCESS: 'Изменения сохранены.',
    UPDATE_PASSWORD_SUCCESS: 'Пароль успешно изменен.',
    UPDATE_PASSWORD_ERROR: 'Неверный старый пароль',
    DELETE_PROFILE_SUCCESS: 'Аккаунт успешно удален.',
};

export const NOTIFICATION_DESCRIPTIONS = {
    RECIPE_EXISTS_ERROR: 'Рецепт с таким названием уже существует.',
    UPLOAD_IMAGE_ERROR: 'Попробуйте сохранить фото позже.',
    GET_RECIPES_ERROR: 'Попробуйте поискать снова попозже',
    DELETE_RECIPE_ERROR: 'Не удалось удалить рецепт.',
    CREATE_RECIPE_ERROR: 'Попробуйте пока сохранить в черновик.',
    SAVE_DRAFT_ERROR: 'Не удалось сохранить черновик рецепта.',
    TRY_LITTLE_LATER: 'Попробуйте немного позже.',
    TRY_LATER: 'Попробуйте позже.',
    EMAIL_NOT_FOUND: 'Попробуйте другой e-mail или проверьте правильность его написания',
    EMAIL_NOT_VERIFIED: 'Проверьте почту и перейдите по ссылке',
    TRY_AGAIN: 'Попробуйте снова',
};

export const NOTIFICATION_MESSAGES = {
    VERIFICATION_SUCCESS: {
        title: NOTIFICATION_TITLES.VERIFICATION_SUCCESS,
        position: 'bottom-left',
    },
    INVALID_CREDENTIALS: {
        title: NOTIFICATION_TITLES.INVALID_CREDENTIALS,
        description: NOTIFICATION_DESCRIPTIONS.TRY_AGAIN,
        position: 'bottom-left',
    },
    EMAIL_NOT_VERIFIED: {
        title: NOTIFICATION_TITLES.EMAIL_NOT_VERIFIED,
        description: NOTIFICATION_DESCRIPTIONS.EMAIL_NOT_VERIFIED,
        position: 'bottom-left',
    },
    EMAIL_EXISTS: {
        title: NOTIFICATION_TITLES.EMAIL_EXISTS,
        position: 'bottom-left',
    },
    LOGIN_EXISTS: {
        title: NOTIFICATION_TITLES.LOGIN_EXISTS,
        position: 'bottom-left',
    },
    EMAIL_NOT_FOUND: {
        title: NOTIFICATION_TITLES.EMAIL_NOT_FOUND,
        description: NOTIFICATION_DESCRIPTIONS.EMAIL_NOT_FOUND,
    },
    SERVER_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.TRY_LITTLE_LATER,
    },
    SERVER_ERROR_1: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.TRY_LATER,
    },
    UPLOAD_IMAGE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.UPLOAD_IMAGE_ERROR,
    },
    GET_RECIPES_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.GET_RECIPES_ERROR,
    },
    RESET_CREDENTIALS_SUCCESS: {
        title: NOTIFICATION_TITLES.RESET_CREDENTIALS_SUCCESS,
        position: 'bottom-left',
    },
    AUTH_ERROR: {
        title: NOTIFICATION_TITLES.AUTH_ERROR,
        position: 'bottom-left',
    },
    RECIPE_EXISTS_ERROR: {
        title: NOTIFICATION_TITLES.ERROR,
        description: NOTIFICATION_DESCRIPTIONS.RECIPE_EXISTS_ERROR,
    },
    CREATE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.CREATE_RECIPE_ERROR,
    },
    SAVE_DRAFT_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.SAVE_DRAFT_ERROR,
    },
    CREATE_RECIPE_DRAFT_SUCCESS: {
        title: NOTIFICATION_TITLES.CREATE_RECIPE_DRAFT_SUCCESS,
    },
    CREATE_RECIPE_SUCCESS: {
        title: NOTIFICATION_TITLES.CREATE_RECIPE_SUCCESS,
    },
    CREATE_NOTE_SUCCESS: {
        title: NOTIFICATION_TITLES.CREATE_NOTE_SUCCESS,
    },
    DELETE_NOTE_SUCCESS: {
        title: NOTIFICATION_TITLES.DELETE_NOTE_SUCCESS,
    },
    DELETE_RECIPE_ERROR: {
        title: NOTIFICATION_TITLES.SERVER_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.DELETE_RECIPE_ERROR,
    },
    DELETE_RECIPE_SUCCESS: {
        title: NOTIFICATION_TITLES.DELETE_RECIPE_SUCCESS,
    },
    RECIPE_NOT_FOUND_ERROR: {
        title: NOTIFICATION_TITLES.RECIPE_NOT_FOUND_ERROR,
    },
    CHANGES_INFO_SUCCESS: {
        title: NOTIFICATION_TITLES.CHANGES_INFO_SUCCESS,
    },
    UPDATE_PASSWORD_SUCCESS: {
        title: NOTIFICATION_TITLES.UPDATE_PASSWORD_SUCCESS,
    },
    UPDATE_PASSWORD_ERROR: {
        title: NOTIFICATION_TITLES.UPDATE_PASSWORD_ERROR,
        description: NOTIFICATION_DESCRIPTIONS.TRY_AGAIN,
    },
    DELETE_PROFILE_SUCCESS: {
        title: NOTIFICATION_TITLES.DELETE_PROFILE_SUCCESS,
    },
} as const satisfies Record<string, NotificationMessage>;
