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
};

export type NewUser = Omit<FormInputs, 'confirmPassword'>;
export type ResetUser = Pick<FormInputs, 'email' | 'login' | 'password' | 'passwordConfirm'>;
export type VerifyUser = { email: string; otpToken: string };
export type AuthUser = {
    login: string;
    password: string;
};

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
