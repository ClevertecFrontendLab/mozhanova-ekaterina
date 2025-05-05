import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export interface Meta {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru' }),
    tagTypes: ['Recipes', 'Recipe'],
    endpoints: (builder) => ({
        getLatestRecipes: builder.query<
            { data: TRecipe[]; meta: Meta },
            { page?: number; limit?: number; sortBy?: string; sortOrder?: string }
        >({
            query: (params) => ({
                url: '/recipe',
                params: {
                    page: params.page,
                    limit: params.limit,
                    sortBy: 'createdAt',
                    sortOrder: 'asc',
                },
            }),
            providesTags: ['Recipes'],
        }),

        getPopularRecipes: builder.query<
            { data: TRecipe[]; meta: Meta },
            {
                page?: number;
                limit?: number;
                sortBy?: string;
                sortOrder?: string;
                allergens?: string[];
            }
        >({
            query: (params) => ({
                url: '/recipe',
                params: {
                    ...params,
                    sortBy: 'likes',
                    sortOrder: 'desc',
                    allergens: params.allergens?.join(','),
                },
            }),
            providesTags: ['Recipes'],
        }),

        getRecipeById: builder.query<TRecipe, string>({
            query: (id) => `/recipe/${id}`,
            providesTags: (result) => (result ? [{ type: 'Recipe', id: result._id }] : ['Recipe']),
        }),

        getRecipesByCategory: builder.query<
            { data: TRecipe[]; meta: Meta },
            {
                categoryId: string;
                page?: number;
                limit?: number;
                allergens?: string[];
                searchString?: string;
            }
        >({
            query: ({ categoryId, ...params }) => ({
                url: `/recipe/category/${categoryId}`,
                params: {
                    ...params,
                    allergens: params.allergens?.join(','),
                },
            }),
            providesTags: ['Recipes'],
        }),

        searchRecipes: builder.query<
            { data: TRecipe[]; meta: Meta },
            {
                page?: number;
                limit?: number;
                sortBy?: string;
                sortOrder?: string;
                allergens?: string[];
                searchString?: string;
                meat?: string[];
                garnish?: string[];
                subcategoriesIds?: string[];
            }
        >({
            query: (params) => ({
                url: '/recipe',
                params: {
                    ...params,
                    allergens: params.allergens?.join(','),
                    meat: params.meat?.join(','),
                    garnish: params.garnish?.join(','),
                    subcategoriesIds: params.subcategoriesIds?.join(','),
                },
            }),
            providesTags: ['Recipes'],
        }),
    }),
});

export const {
    useGetLatestRecipesQuery,
    useGetPopularRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipesByCategoryQuery,
    useSearchRecipesQuery,
} = recipeApi;

export default recipeApi.reducer;
