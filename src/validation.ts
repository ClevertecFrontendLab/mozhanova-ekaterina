import * as yup from 'yup';

export const passwordSchema = yup
    .string()
    .required('Введите пароль')
    .min(8, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+.-]{8,}$/, 'Не соответствует формату');

export const loginSchema = yup
    .string()
    .trim()
    .required('Введите логин')
    .min(5, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^[A-Za-z\d!@#$&_+\-.]*$/, 'Не соответствует формату');

export const emailSchema = yup
    .string()
    .trim()
    .required('Введите e-mail')
    .max(50, 'Максимальная длина 50 символов')
    .email('Введите корректный e-mail')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный e-mail');

export const RegistrationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required('Введите имя')
        .matches(/^[А-ЯЁ]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-ЯЁ][А-ЯЁа-яё-]*$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: yup
        .string()
        .trim()
        .required('Введите фамилию')
        .matches(/^[А-ЯЁ]/, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-ЯЁ][А-ЯЁа-яё-]*$/, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    login: loginSchema.required('Введите логин'),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const LoginSchema = yup.object({
    login: loginSchema,
    password: passwordSchema,
});

export const RecoverySchema = yup.object({
    login: loginSchema.required('Введите логин'),
    password: passwordSchema.required('Введите пароль'),
    passwordConfirm: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const OtpSchema = yup.object({
    code: yup.string().min(6).required(),
});
