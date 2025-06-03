import { Bloggers, BloggersParams } from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const BlogsApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_BLOGGERS]: builder.query<Bloggers, BloggersParams>({
            query: (params) => ({
                url: ApiEndpoints.BLOGGERS,
                params: {
                    ...params,
                    currentUserId: params.currentUserId,
                },
            }),
            providesTags: [Tags.BLOGGERS],
        }),
        [EndpointNames.GET_BLOGGER_BY_ID]: builder.query<Bloggers, BloggersParams>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}/${params.bloggerId}`,
                params: {
                    ...params,
                    currentUserId: params.currentUserId,
                },
            }),
            providesTags: [Tags.BLOGGERS],
        }),
    }),
});

export const {
    useGetBloggersQuery,
    useGetBloggerByIdQuery,
    useLazyGetBloggerByIdQuery,
    useLazyGetBloggersQuery,
} = BlogsApi;
