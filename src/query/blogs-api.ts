import {
    AllBloggersResponse,
    BloggerResponse,
    BloggerResponseDto,
    GetBloggerByIdParams,
    GetBloggersParams,
    ToggleSubsParams,
} from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Limit } from './constants/limits';
import { Tags } from './constants/tags';
import { transformId } from './helpers/transform-id';

export const BlogsApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_BLOGGERS]: builder.query<AllBloggersResponse, GetBloggersParams>({
            query: (params) => ({
                url: ApiEndpoints.BLOGGERS,
                params: params,
            }),
            providesTags: (_result, _error, arg) => {
                if (arg.limit === Limit.OTHER_BLOGS) return [];
                return [Tags.BLOGGERS];
            },
        }),
        [EndpointNames.GET_BLOGGER_BY_ID]: builder.query<BloggerResponse, GetBloggerByIdParams>({
            query: (params) => ({
                url: `${ApiEndpoints.BLOGGERS}/${params.bloggerId}`,
                params: {
                    currentUserId: params.currentUserId,
                },
            }),
            transformResponse: (response: BloggerResponseDto) => ({
                ...response,
                bloggerInfo: {
                    ...response.bloggerInfo,
                    _id: transformId(response.bloggerInfo._id),
                },
            }),
            providesTags: [Tags.BLOGGERS],
        }),
        [EndpointNames.TOGGLE_SUBSCRIPTION]: builder.mutation<void, ToggleSubsParams>({
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
