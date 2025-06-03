import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const BlogsApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_BLOGGERS]: builder.query<void, void>({
            query: () => ApiEndpoints.BLOGGERS,
            providesTags: [Tags.BLOGGERS],
        }),
        [EndpointNames.GET_BLOGGER_BY_ID]: builder.query<void, string>({
            query: (id) => `${ApiEndpoints.BLOGGERS}/${id}`,
            providesTags: [Tags.BLOGGERS],
        }),
    }),
});

export const { useGetBloggersQuery, useGetBloggerByIdQuery } = BlogsApi;
