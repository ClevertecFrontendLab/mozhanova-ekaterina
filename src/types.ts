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
export type Step = { stepNumber: number; description: string; image?: string | null | undefined };
export type MeasureUnit = {
    _id: string;
    name: string;
};
export type RecipeDraft = Partial<Omit<NewRecipe, 'title'>> & Pick<NewRecipe, 'title'>;
export type RecipeDraftDto = RecipeDraft & {
    _id: string;
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

export type Meta = {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
};

export type RecipeParams = {
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

export type ToggleSubsParams = {
    fromUserId: string;
    toUserId: string;
};
export type GetBloggerByIdParams = {
    bloggerId: string;
    currentUserId: string;
};
export type GetBloggersParams = {
    currentUserId: string;
    limit: number | 'all' | '';
};
export type NoteDto = {
    _id: string;
    date: string;
    text: string;
};
export type Note = {
    text: string;
};
export type ObjectId = {
    buffer: {
        type: 'Buffer';
        data: number[];
    };
};
export type UserDto = {
    _id: string;
    drafts: RecipeDraftDto[];
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
    email: string;
    login: string;
    lastName: string;
    firstName: string;
    photoLink?: string;
};
export type UserUpdateInfo = {
    firstName: string;
    lastName: string;
};
export type UpdatePassword = {
    password: string;
    newPassword: string;
};
export type StatisticDto = {
    likes: { data: string; count: number }[];
    bookmarks: { data: string; count: number }[];
    recommendationsCount: number;
};
export type BloggerInfoDto = {
    _id: ObjectId;
    createdAt: string;
    updatedAt: string;
    email: string;
    emailVerifiedAt: string;
    isEmailVerified: boolean;
    password: string;
    photoLink: string;
    refreshToken: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: ObjectId[];
    subscribers: ObjectId[];
    subscriptions: ObjectId[];
    notes: NoteDto[];
};
export type BloggerInfo = Omit<BloggerInfoDto, '_id'> & {
    _id: string;
};
export type Blogger = Pick<BloggerInfo, '_id' | 'login' | 'firstName' | 'lastName' | 'notes'> & {
    bookmarksCount: number;
    isFavorite: boolean;
    newRecipesCount: number;
    subscribersCount: number;
};

export type BloggerResponseDto = {
    bloggerInfo: BloggerInfoDto;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};
export type AllBloggersResponse = {
    favorites: Blogger[];
    others: Blogger[];
};
export type BloggerResponse = Omit<BloggerResponseDto, 'bloggerInfo'> & {
    bloggerInfo: BloggerInfo;
};

export type RecipesResponse = {
    data: Recipe[];
    meta: Meta;
};

export type RecipesByUserResponse = {
    recipes: Recipe[];
    myBookmarks: Recipe[];
    notes: NoteDto[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
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

export type NewAuth = Omit<FormInputs, 'confirmPassword' | 'code'>;
export type ResetAuth = Pick<FormInputs, 'email' | 'login' | 'password' | 'passwordConfirm'>;
export type VerifyAuth = { email: string; otpToken: string };
export type Auth = Pick<FormInputs, 'login' | 'password'>;

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
    count: number;
};

export type LikeResponse = {
    message: string;
    count: number;
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
    signUpSuccess: { email?: string };
    verificationFailed: undefined;
    sendEmail: undefined;
    verificationCode: { email?: string };
    resetCredentials: { email?: string };
    signInError: { userData?: Auth };
    uploadImage: {
        title?: React.ReactNode;
        uploadButton?: string;
        cancelButton?: string;
        preview?: string;
        testId?: string;
        onChange?: (url: string) => void;
        handleUpload?: (formData: FormData) => void;
    };
    recipePreventive: { draft?: RecipeDraft; setError?: VoidFunction; link?: string };
    updatePassword: undefined;
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
