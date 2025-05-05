import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCategories } from '~/store/category-slice';

export interface ICategory {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: ISubCategory[];
    rootCategoryId?: string;
}

export interface ISubCategory {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru' }),
    tagTypes: ['Categories', 'Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => '/category',
            providesTags: ['Categories'],
            onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCategories(data));
                    localStorage.setItem('navCache', JSON.stringify(data));
                } catch (_) {
                    const cachedData = localStorage.getItem('navCache');
                    if (cachedData) {
                        const categories: ICategory[] = JSON.parse(cachedData);
                        dispatch(setCategories(categories));
                        dispatch(
                            categoryApi.util.upsertQueryData(
                                'getCategories',
                                undefined,
                                categories,
                            ),
                        );
                    }
                }
            },
        }),
        getCategoryById: builder.query<ICategory, string>({
            query: (id) => `/category/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Category', id }],
            // Используем кэш при ошибке
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (_) {
                    const cachedData = localStorage.getItem('navCache');
                    if (cachedData) {
                        const categories: ICategory[] = JSON.parse(cachedData);
                        const category = categories.find((c) => c._id === id);
                        if (category) {
                            dispatch(
                                categoryApi.util.upsertQueryData('getCategoryById', id, category),
                            );
                        }
                    }
                }
            },
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
