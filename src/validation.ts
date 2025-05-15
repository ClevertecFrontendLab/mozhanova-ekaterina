import * as yup from 'yup';

export const passwordSchema = yup
    .string()
    .min(8, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+.-]{8,}$/, 'Не соответствует формату');

export const loginSchema = yup
    .string()
    .trim()
    .min(5, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^[A-Za-z\d!@#$&_+\-.]*$/, 'Не соответствует формату');

export const emailSchema = yup
    .string()
    .trim()
    .email('Введите корректный e-mail')
    .max(50, 'Максимальная длина 50 символов');

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
    email: emailSchema.required('Введите e-mail'),
    password: passwordSchema.required('Введите пароль'),
    passwordConfirm: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const LoginSchema = yup.object({
    login: loginSchema.required('Введите логин'),
    password: passwordSchema.required('Введите пароль'),
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
