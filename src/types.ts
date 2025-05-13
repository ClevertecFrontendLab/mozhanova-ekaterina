export type TRecipe = {
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

export type TMeta = {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
};

export type TParams = {
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
export type TCategory = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: TSubCategory[];
    rootCategoryId?: string;
};

export type TSubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type TFormInputs = {
    name: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type TNewUser = Omit<TFormInputs, 'confirmPassword'>;

export type TAuth = {
    login: string;
    password: string;
};

export type TAuthResponse = {
    // accessToken?: string;
    // refreshToken?: string;
    statusText: string;
    message: string;
};

export type TErrorResponse = {
    status: number;
    data?: {
        message: string;
        error: string;
        statusCode: number;
    };
};
