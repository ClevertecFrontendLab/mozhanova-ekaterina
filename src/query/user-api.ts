import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Измените импорт

import { API_BASE_URL } from '~/config';
import { TAuth, TAuthResponse, TNewUser } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: [Tags.AUTH],
    endpoints: (builder) => ({
        [EndpointNames.LOGIN]: builder.mutation<TAuthResponse, TAuth>({
            query: (credentials) => ({
                url: ApiEndpoints.AUTH,
                method: 'POST',
                body: credentials,
            }),
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
    }),
});

export const { useLoginMutation, useSignUpMutation } = userApi;
