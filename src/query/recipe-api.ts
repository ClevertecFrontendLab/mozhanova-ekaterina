import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '~/constants/api-config';
import { Meta, Params, Recipe } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: [Tags.RECIPE, Tags.RECIPES],
    endpoints: (builder) => ({
        [EndpointNames.GET_LATEST_RECIPES]: builder.query<{ data: Recipe[]; meta: Meta }, Params>({
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

        [EndpointNames.GET_POPULAR_RECIPES]: builder.query<{ data: Recipe[]; meta: Meta }, Params>({
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
            Params
        >({
            query: ({ categoryId, ...params }) => ({
                url: `${ApiEndpoints.RECIPE_CATEGORY}${categoryId}`,
                params: {
                    ...params,
                },
            }),
            providesTags: [Tags.RECIPES],
        }),

        [EndpointNames.SEARCH_RECIPES]: builder.query<{ data: Recipe[]; meta: Meta }, Params>({
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
} = recipeApi;
