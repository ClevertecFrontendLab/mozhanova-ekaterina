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
        MIN_8: 'Не соответствует формату',
        MAX_50: 'Максимальная длина 50 символов',
        MIN_5: 'Не соответствует формату',
    },
};

export const REGEXP_PATTERNS = {
    PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+.-]{8,}$/,
    LOGIN: /^[A-Za-z\d!@#$&_+\-.]*$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CYRILLIC: /^[А-ЯЁ][А-ЯЁа-яё-]*$/,
};
