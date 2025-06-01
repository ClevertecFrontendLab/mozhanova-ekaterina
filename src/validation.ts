import * as yup from 'yup';

import { REGEXP_PATTERNS, VALIDATION_MESSAGES } from './constants/validation-config';

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

export const VerificationCodeSchema = yup.object({
    code: yup.string().min(6, '').required(VALIDATION_MESSAGES.REQUIRED.CODE),
});

const ingredientSchema = yup.object().shape({
    title: yup.string().trim().required().max(50, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_50),
    count: yup.number().required(),
    measureUnit: yup.string().required(),
});

const ingredientsDraftSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .max(50, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_50)
        .transform((value) => (value === '' ? undefined : value)),
    count: yup.number().transform((value) => (value === 0 ? undefined : value)),
    measureUnit: yup.string().transform((value) => (value === '' ? undefined : value)),
});

const stepSchema = yup.object().shape({
    stepNumber: yup.number().required().positive().integer(),
    description: yup
        .string()
        .trim()
        .required()
        .max(300, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_300)
        .transform((value) => (value === '' ? undefined : value)),
    image: yup
        .string()
        .nullable()
        .transform((value) => (value === '' ? null : value)),
});

const stepsDraftSchema = yup.object().shape({
    stepNumber: yup.number().required().positive().integer(),
    description: yup
        .string()
        .trim()
        .max(300, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_300)
        .transform((value) => (value === '' ? undefined : value)),
    image: yup
        .string()
        .nullable()
        .transform((value) => (value === '' ? null : value)),
});

export const baseRecipeSchema = {
    title: yup.string().required().trim().max(50, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_50),
    description: yup
        .string()
        .trim()
        .max(500, VALIDATION_MESSAGES.LENGTH.RECIPE_MAX_500)
        .transform((value) => (value === '' ? undefined : value)),
    categoriesIds: yup
        .array()
        .of(yup.string().required())
        .min(3)
        .transform((value) => (value.length === 0 ? undefined : value)),
    image: yup.string().transform((value) => (value === '' ? undefined : value)),
    time: yup
        .number()

        .max(
            10000,
            VALIDATION_MESSAGES.LENGTH.MAX_10000 + VALIDATION_MESSAGES.FORMAT.ONLY_POSITIVE_NUMBER,
        )
        .positive(
            VALIDATION_MESSAGES.LENGTH.MAX_10000 + VALIDATION_MESSAGES.FORMAT.ONLY_POSITIVE_NUMBER,
        ),
    portions: yup.number(),
    ingredients: yup
        .array()
        .of(ingredientsDraftSchema)
        .transform((value) => (value.length === 0 ? undefined : value)),
    steps: yup.array().of(stepsDraftSchema),
};

export const RecipePublishSchema = yup.object().shape({
    ...baseRecipeSchema,
    description: baseRecipeSchema.description.required(),
    categoriesIds: baseRecipeSchema.categoriesIds.required(),
    image: baseRecipeSchema.image.required(),
    time: baseRecipeSchema.time.required(),
    portions: baseRecipeSchema.portions.required(),
    ingredients: yup.array().of(ingredientSchema).required(),
    steps: yup.array().of(stepSchema).required(),
});

export const RecipeDraftSchema = yup.object().shape(baseRecipeSchema);
