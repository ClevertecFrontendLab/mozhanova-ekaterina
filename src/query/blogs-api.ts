import { AllBloggersResponse, BloggerResponse, BloggersParams } from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const BlogsApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_BLOGGERS]: builder.query<AllBloggersResponse, BloggersParams>({
            query: (params) => ({
                url: ApiEndpoints.BLOGGERS,
                params: params,
            }),
            providesTags: [Tags.BLOGGERS],
        }),
        [EndpointNames.GET_BLOGGER_BY_ID]: builder.query<BloggerResponse, BloggersParams>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}/${params.bloggerId}`,
                params: params,
            }),
            providesTags: [Tags.BLOGGERS],
        }),
        [EndpointNames.TOGGLE_SUBSCRIPTION]: builder.mutation<void, BloggersParams>({
            query: (params) => ({
                url: ApiEndpoints.USER_TOGGLE_SUBSCRIPTION,
                method: 'PATCH',
                body: params,
            }),
            invalidatesTags: [Tags.BLOGGERS],
        }),
    }),
});

export const {
    useGetBloggersQuery,
    useGetBloggerByIdQuery,
    useLazyGetBloggerByIdQuery,
    useLazyGetBloggersQuery,
    useToggleSubscriptionMutation,
} = BlogsApi;
