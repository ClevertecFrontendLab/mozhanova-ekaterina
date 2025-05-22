import { ToastPosition } from '@chakra-ui/react';

export type Recipe = {
    _id: string;
    title: string;
    description: string;
    categoriesIds: string[];
    image: string;
    bookmarks: number;
    likes: number;
    views: number;
    createdAt: string;
    time: string;
    portions: number;
    authorId: string;
    nutritionValue: { calories: number; protein: number; fats: number; carbohydrates: number };
    ingredients: Array<{ title: string; count: string; measureUnit: string }>;
    steps: Array<{ stepNumber: number; description: string; image: string }>;
    meat?: string;
    side?: string;
};

export type Meta = {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
};

export type Params = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    allergens?: string[];
    searchString?: string;
    categoryId?: string;
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
};
export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
    rootCategoryId?: string;
};

export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type FormInputs = {
    name: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
    code: string;
};

export type NewUser = Omit<FormInputs, 'confirmPassword' | 'code'>;
export type ResetUser = Pick<FormInputs, 'email' | 'login' | 'password' | 'passwordConfirm'>;
export type VerifyUser = { email: string; otpToken: string };
export type AuthUser = Pick<FormInputs, 'login' | 'password'>;

export type AuthResponse = {
    message: string;
    statusText: string;
};

export type ErrorResponse = {
    status: number;
    data?: {
        message: string;
        error: string;
        statusCode: number;
    };
};

export type QueryFulfilled = Promise<{
    meta?: { response?: { headers?: Headers } };
    data?: unknown;
}>;

export enum ErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
}

export type ErrorCase = {
    toast?: Omit<ToastParams, 'type'>;
    modal?: ModalType;
    setErrorFields?: (keyof FormInputs)[];
    setHeaderText?: string;
};
export type ErrorConfig = Partial<Record<ErrorStatus | 'default', ErrorCase>>;

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastParams = {
    type: ToastType;
    title?: string;
    description?: string;
    duration?: number;
    position?: ToastPosition;
};

export type NotificationMessage = {
    title: string;
    description?: string;
    duration?: number;
    position?: ToastPosition;
};

export type ModalType =
    | 'showSignUpSuccess'
    | 'showSignInError'
    | 'showVerificationFailed'
    | 'showSendEmail'
    | 'showVerificationCode'
    | 'showResetCredentials';
