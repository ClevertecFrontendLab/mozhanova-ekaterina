import { AlertStatus, ToastPosition } from '@chakra-ui/react';

import { modalConfig } from './constants/modal-config';

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
    time: number;
    portions: number;
    authorId: string;
    nutritionValue: { calories: number; protein: number; fats: number; carbohydrates: number };
    ingredients: Ingredient[];
    steps: Step[];
    meat?: string;
    side?: string;
};

export type Ingredient = { title: string; count: number; measureUnit: string };
export type Step = { stepNumber: number; description: string; image?: string | undefined };
export type MeasureUnit = {
    _id: string;
    name: string;
};

export type NewRecipe = Pick<
    Recipe,
    | 'title'
    | 'categoriesIds'
    | 'description'
    | 'image'
    | 'time'
    | 'portions'
    | 'steps'
    | 'ingredients'
>;

export type RecipeDraft = Partial<Omit<NewRecipe, 'title'>> & Pick<NewRecipe, 'title'>;

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

export type MediaResponse = {
    _id: string;
    name: string;
    url: string;
};

export type BookmarkResponse = {
    message: string;
    bookmarks: number;
};

export type LikeResponse = {
    message: string;
    bookmarks: number;
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

export type ToastParams = {
    type: AlertStatus;
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

export type ModalType = (typeof modalConfig)[number]['type'];

export type ModalParams<T extends ModalType> = {
    signUpSuccess: { email: string };
    verificationFailed: undefined;
    sendEmail: undefined;
    verificationCode: { email: string };
    resetCredentials: { email: string };
    signInError: { userData: AuthUser };
    uploadImage: {
        initialImage: string;
        uploadInputRef: React.RefObject<HTMLInputElement | null>;
        onChange: (image: string) => void;
    };
    recipePreventive: { draft: RecipeDraft; link: string };
}[T];

export type ModalState<T extends ModalType = ModalType> = {
    type: T;
    params: ModalParams<T>;
};

export type JwtPayload = {
    userId: string;
    login: string;
    exp: number;
    iat: number;
};
