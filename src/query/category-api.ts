import { setCategories } from '~/store/category-slice';
import { Category } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';
import { unauthorizedApi } from './unauthorized-api';

export const categoryApi = unauthorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_CATEGORIES]: builder.query<Category[], void>({
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
                        const categories: Category[] = JSON.parse(cachedData);
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
        [EndpointNames.GET_CATEGORY_BY_ID]: builder.query<Category, string>({
            query: (id) => `${ApiEndpoints.CATEGORY_BY_ID}${id}`,
            providesTags: [Tags.CATEGORIES],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (_) {
                    const cachedData = localStorage.getItem('navCache');
                    if (cachedData) {
                        const categories: Category[] = JSON.parse(cachedData);
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
