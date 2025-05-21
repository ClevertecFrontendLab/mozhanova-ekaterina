export const API_BASE_URL = 'https://marathon-api.clevertec.ru';
export const API_IMAGE_URL = 'https://training-api.clevertec.ru';

export const AppRoutes = {
    HOME: '/',
    SEARCH: '/search',
    CATEGORY: '/:category',
    CATEGORY_WILDCARD: '/:category/*',
    SUB_CATEGORY: ':subCategory',
    RECIPE: '/:category/:subCategory/:id',
    THE_JUICIEST: '/the-juiciest',
    NOT_FOUND: '/not-found',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    VERIFICATION: '/verification',
    RECOVERY: '/signin/recovery',
} as const;

export const VALIDATION_MESSAGES = {
    REQUIRED: {
        PASSWORD: 'Введите пароль',
        LOGIN: 'Введите логин',
        EMAIL: 'Введите e-mail',
        NAME: 'Введите имя',
        LAST_NAME: 'Введите фамилию',
        PASSWORD_CONFIRM: 'Повторите пароль',
        CODE: 'Обязательное поле',
    },
    FORMAT: {
        PASSWORD: 'Не соответствует формату',
        LOGIN: 'Не соответствует формату',
        EMAIL: 'Введите корректный e-mail',
        CYRILLIC_START: 'Должно начинаться с кириллицы А-Я',
        CYRILLIC_ONLY: 'Только кириллица А-Я, и "-"',
        PASSWORD_MATCH: 'Пароли должны совпадать',
    },
    LENGTH: {
        MIN_8: 'Минимальная длина 8 символов',
        MAX_50: 'Максимальная длина 50 символов',
        MIN_5: 'Минимальная длина 5 символов',
    },
};

export const REGEXP_PATTERNS = {
    PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+.-]{8,}$/,
    LOGIN: /^[A-Za-z\d!@#$&_+\-.]*$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CYRILLIC: /^[А-ЯЁ][А-ЯЁа-яё-]*$/,
};
