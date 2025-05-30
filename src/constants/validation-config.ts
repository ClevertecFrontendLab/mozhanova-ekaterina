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
        ONLY_POSITIVE_NUMBER: 'Только положительное число',
    },
    LENGTH: {
        MIN_8: 'Не соответствует формату',
        MAX_50: 'Максимальная длина 50 символов',
        RECIPE_MAX_50: 'Не более 50 символов',
        RECIPE_MAX_300: 'Не более 300 символов',
        RECIPE_MAX_500: 'Не более 500 символов',
        CATEGORY_LENGTH: 'Не менее 3 категорий',
        MIN_5: 'Не соответствует формату',
        MAX_10000: 'не более 10000',
    },
};

export const REGEXP_PATTERNS = {
    PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+.-]{8,}$/,
    LOGIN: /^[A-Za-z\d!@#$&_+\-.]*$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CYRILLIC: /^[А-ЯЁ][А-ЯЁа-яё-]*$/,
};
