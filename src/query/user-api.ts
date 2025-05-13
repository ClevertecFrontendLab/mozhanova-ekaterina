import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Измените импорт

import { API_BASE_URL } from '~/config';
import { setAuthenticated } from '~/store/user-slice';
import { TAuth, TAuthResponse, TNewUser } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: ApiEndpoints.REFRESH_TOKEN,
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as { accessToken: string };
            localStorage.setItem('accessToken', accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('accessToken');
            api.dispatch(setAuthenticated(false));
        }
    }

    return result;
};

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [Tags.AUTH],
    endpoints: (builder) => ({
        [EndpointNames.LOGIN]: builder.mutation<TAuthResponse, TAuth>({
            query: (credentials) => ({
                url: ApiEndpoints.AUTH,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;

                    const accessToken = (
                        meta as { response: { headers: Headers } }
                    )?.response?.headers.get('Authentication-Access');

                    if (accessToken) {
                        localStorage.setItem('accessToken', accessToken);
                    }
                } catch (_error) {
                    localStorage.removeItem('accessToken');
                }
            },
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.SIGN_UP]: builder.mutation<TAuthResponse, TNewUser>({
            query: (newUser) => ({
                url: ApiEndpoints.SIGN_UP,
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        checkAuth: builder.query<void, void>({
            query: () => ({
                url: ApiEndpoints.CHECK_AUTH,
                method: 'GET',
            }),
            providesTags: [Tags.AUTH],
        }),

        // refreshTokens: builder.mutation<{ accessToken: string }, void>({
        //     query: () => ({
        //         url: ApiEndpoints.REFRESH_TOKEN,
        //         method: 'POST',
        //     }),
        // }),

        // logout: builder.mutation<void, void>({
        //     query: () => ({
        //         url: '/auth/logout',
        //         method: 'POST',
        //     }),
        //     async onQueryStarted(_rgs, { queryFulfilled }) {
        //         await queryFulfilled;
        //         localStorage.removeItem('accessToken');
        //     },
        // }),
    }),
});

export const { useLoginMutation, useSignUpMutation, useCheckAuthQuery } = userApi;
