import {
    BookmarkResponse,
    LikeResponse,
    MeasureUnit,
    Meta,
    NewRecipe,
    Recipe,
    RecipeDraft,
    RecipeParams,
    RecipesByUserResponse,
} from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const recipeApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_LATEST_RECIPES]: builder.query<
            { data: Recipe[]; meta: Meta },
            RecipeParams
        >({
            query: (params) => ({
                url: ApiEndpoints.RECIPES,
                params: {
                    ...params,
                    sortBy: 'createdAt',
                    sortOrder: 'asc',
                },
            }),
            providesTags: [Tags.RECIPES],
        }),

        [EndpointNames.GET_POPULAR_RECIPES]: builder.query<
            { data: Recipe[]; meta: Meta },
            RecipeParams
        >({
            query: (params) => ({
                url: ApiEndpoints.RECIPES,
                params: {
                    ...params,
                    sortBy: 'likes',
                    sortOrder: 'desc',
                    allergens: params.allergens?.join(','),
                },
            }),
            providesTags: [Tags.RECIPES],
        }),

        [EndpointNames.GET_RECIPE_BY_ID]: builder.query<Recipe, string>({
            query: (id) => `${ApiEndpoints.RECIPE_BY_ID}${id}`,
            providesTags: (result) =>
                result ? [{ type: Tags.RECIPE, id: result._id }] : [Tags.RECIPE],
        }),

        [EndpointNames.GET_RECIPES_BY_CATEGORY]: builder.query<
            { data: Recipe[]; meta: Meta },
            RecipeParams
        >({
            query: ({ categoryId, ...params }) => ({
                url: `${ApiEndpoints.RECIPE_CATEGORY}${categoryId}`,
                params: {
                    ...params,
                },
            }),
            providesTags: [Tags.RECIPES],
        }),

        [EndpointNames.SEARCH_RECIPES]: builder.query<{ data: Recipe[]; meta: Meta }, RecipeParams>(
            {
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    params: {
                        ...params,
                        allergens: params.allergens?.join(','),
                        meat: params.meat?.join(','),
                        garnish: params.garnish?.join(','),
                        subcategoriesIds: params.subcategoriesIds?.join(','),
                    },
                }),
                providesTags: [Tags.RECIPES],
            },
        ),

        [EndpointNames.MEASURE_UNITS]: builder.query<MeasureUnit[], void>({
            query: () => ({
                url: ApiEndpoints.MEASURE_UNITS,
            }),
        }),

        [EndpointNames.CREATE_RECIPE]: builder.mutation<Recipe, NewRecipe>({
            query: (recipe) => ({
                url: ApiEndpoints.RECIPES,
                method: 'POST',
                body: recipe,
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.CREATE_RECIPE_DRAFT]: builder.mutation<Recipe, RecipeDraft>({
            query: (recipe) => ({
                url: ApiEndpoints.CREATE_RECIPE_DRAFT,
                method: 'POST',
                body: recipe,
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.UPDATE_RECIPE]: builder.mutation<Recipe, Recipe>({
            query: (recipe) => ({
                url: `${ApiEndpoints.RECIPE_BY_ID}${recipe._id}`,
                method: 'PATCH',
                body: recipe,
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.DELETE_RECIPE]: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE_BY_ID}${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.LIKE_UNLIKE_RECIPE]: builder.mutation<LikeResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE_BY_ID}${id}${ApiEndpoints.LIKE_UNLIKE_RECIPE}`,
                method: 'POST',
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.SAVE_REMOVE_FROM_BOOKMARKS]: builder.mutation<BookmarkResponse, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE_BY_ID}${id}${ApiEndpoints.SAVE_REMOVE_FROM_BOOKMARKS}`,
                method: 'POST',
            }),
            invalidatesTags: [Tags.RECIPE],
        }),
        [EndpointNames.GET_RECIPES_BY_USER_ID]: builder.query<RecipesByUserResponse, string>({
            query: (bloggerId) => `${ApiEndpoints.GET_RECIPES_BY_USER_ID}${bloggerId}`,
            providesTags: [Tags.RECIPES],
        }),
    }),
});

export const {
    useGetLatestRecipesQuery,
    useGetPopularRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipesByCategoryQuery,
    useLazySearchRecipesQuery,
    useSearchRecipesQuery,
    useMeasureUnitsQuery,
    useLazyMeasureUnitsQuery,
    useCreateRecipeMutation,
    useCreateRecipeDraftMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useLikeUnlikeRecipeMutation,
    useSaveRemoveFromBookmarksMutation,
    useGetRecipesByUserIdQuery,
    useLazyGetRecipesByUserIdQuery,
} = recipeApi;
