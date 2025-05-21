import * as yup from 'yup';

import { REGEXP_PATTERNS, VALIDATION_MESSAGES } from './config';

export const passwordSchema = yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED.PASSWORD)
    .min(8, VALIDATION_MESSAGES.LENGTH.MIN_8)
    .max(50, VALIDATION_MESSAGES.LENGTH.MAX_50)
    .matches(REGEXP_PATTERNS.PASSWORD, VALIDATION_MESSAGES.FORMAT.PASSWORD);

export const loginSchema = yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED.LOGIN)
    .min(5, VALIDATION_MESSAGES.LENGTH.MIN_5)
    .max(50, VALIDATION_MESSAGES.LENGTH.MAX_50)
    .matches(REGEXP_PATTERNS.LOGIN, VALIDATION_MESSAGES.FORMAT.LOGIN);

export const emailSchema = yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED.EMAIL)
    .max(50, VALIDATION_MESSAGES.LENGTH.MAX_50)
    .email(VALIDATION_MESSAGES.FORMAT.EMAIL)
    .matches(REGEXP_PATTERNS.EMAIL, VALIDATION_MESSAGES.FORMAT.EMAIL);

export const RegistrationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required(VALIDATION_MESSAGES.REQUIRED.NAME)
        .matches(/^[А-ЯЁ]/, VALIDATION_MESSAGES.FORMAT.CYRILLIC_START)
        .matches(REGEXP_PATTERNS.CYRILLIC, VALIDATION_MESSAGES.FORMAT.CYRILLIC_ONLY)
        .max(50, VALIDATION_MESSAGES.LENGTH.MAX_50),
    lastName: yup
        .string()
        .trim()
        .required(VALIDATION_MESSAGES.REQUIRED.LAST_NAME)
        .matches(/^[А-ЯЁ]/, VALIDATION_MESSAGES.FORMAT.CYRILLIC_START)
        .matches(REGEXP_PATTERNS.CYRILLIC, VALIDATION_MESSAGES.FORMAT.CYRILLIC_ONLY)
        .max(50, VALIDATION_MESSAGES.LENGTH.MAX_50),
    login: loginSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: yup
        .string()
        .required(VALIDATION_MESSAGES.REQUIRED.PASSWORD_CONFIRM)
        .oneOf([yup.ref('password')], VALIDATION_MESSAGES.FORMAT.PASSWORD_MATCH),
});

export const LoginSchema = yup.object({
    login: loginSchema,
    password: passwordSchema,
});

export const RecoverySchema = yup.object({
    login: loginSchema.required(VALIDATION_MESSAGES.REQUIRED.LOGIN),
    password: passwordSchema.required(VALIDATION_MESSAGES.REQUIRED.PASSWORD),
    passwordConfirm: yup
        .string()
        .required(VALIDATION_MESSAGES.REQUIRED.PASSWORD_CONFIRM)
        .oneOf([yup.ref('password')], VALIDATION_MESSAGES.FORMAT.PASSWORD_MATCH),
});

export const verificationCodeSchema = yup.object({
    code: yup.string().min(6, '').required(VALIDATION_MESSAGES.REQUIRED.CODE),
});
