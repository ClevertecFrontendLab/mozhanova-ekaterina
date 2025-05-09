import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '~/config';
import { setCategories } from '~/store/category-slice';
import { TCategory } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: [Tags.CATEGORIES, Tags.CATEGORY],
    endpoints: (builder) => ({
        [EndpointNames.GET_CATEGORIES]: builder.query<TCategory[], void>({
            query: () => ApiEndpoints.CATEGORIES,
            providesTags: [Tags.CATEGORIES],
            onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCategories(data));
                    localStorage.setItem('navCache', JSON.stringify(data));
                } catch (_) {
                    const cachedData = localStorage.getItem('navCache');
                    if (cachedData) {
                        const categories: TCategory[] = JSON.parse(cachedData);
                        dispatch(setCategories(categories));
                        dispatch(
                            categoryApi.util.upsertQueryData(
                                EndpointNames.GET_CATEGORIES,
                                undefined,
                                categories,
                            ),
                        );
                    }
                }
            },
        }),
        [EndpointNames.GET_CATEGORY_BY_ID]: builder.query<TCategory, string>({
            query: (id) => `${ApiEndpoints.CATEGORY_BY_ID}${id}`,
            providesTags: (_result, _error, id) => [{ type: Tags.CATEGORY, id }],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (_) {
                    const cachedData = localStorage.getItem('navCache');
                    if (cachedData) {
                        const categories: TCategory[] = JSON.parse(cachedData);
                        const category = categories.find((c) => c._id === id);
                        if (category) {
                            dispatch(
                                categoryApi.util.upsertQueryData(
                                    EndpointNames.GET_CATEGORY_BY_ID,
                                    id,
                                    category,
                                ),
                            );
                        }
                    }
                }
            },
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
