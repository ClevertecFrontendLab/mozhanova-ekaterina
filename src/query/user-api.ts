import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Измените импорт

import { API_BASE_URL } from '~/constants/api-config';
import { ApplicationState } from '~/store/configure-store';
import { AuthResponse, AuthUser, NewUser, ResetUser, VerifyUser } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';
import { handleAuthHeaders } from './helpers/auth-helpers';

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as ApplicationState).user.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    tagTypes: [Tags.AUTH],
    endpoints: (builder) => ({
        [EndpointNames.SIGN_IN]: builder.mutation<AuthResponse, AuthUser>({
            query: (credentials) => ({
                url: ApiEndpoints.AUTH,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                await handleAuthHeaders(queryFulfilled, dispatch);
            },
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.SIGN_UP]: builder.mutation<AuthResponse, NewUser>({
            query: (newUser) => ({
                url: ApiEndpoints.SIGN_UP,
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.CHECK_AUTH]: builder.query<AuthResponse, void>({
            query: () => ({
                url: ApiEndpoints.CHECK_AUTH,
                method: 'GET',
            }),
            providesTags: [Tags.AUTH],
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                await handleAuthHeaders(queryFulfilled, dispatch);
            },
        }),

        [EndpointNames.FORGOT_PASSWORD]: builder.mutation<AuthResponse, string>({
            query: (email) => ({
                url: ApiEndpoints.FORGOT_PASSWORD,
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.VERIFY_CODE]: builder.mutation<AuthResponse, VerifyUser>({
            query: ({ email, otpToken }) => ({
                url: ApiEndpoints.VERIFY_OTP,
                method: 'POST',
                body: { email, otpToken },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.RESET_PASSWORD]: builder.mutation<AuthResponse, ResetUser>({
            query: ({ email, login, password, passwordConfirm }) => ({
                url: ApiEndpoints.RESET_PASSWORD,
                method: 'POST',
                body: { email, login, password, passwordConfirm },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.REFRESH_TOKEN]: builder.query<AuthResponse, void>({
            query: () => ({
                url: ApiEndpoints.REFRESH_TOKEN,
                method: 'GET',
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                await handleAuthHeaders(queryFulfilled, dispatch);
            },
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useCheckAuthQuery,
    useForgotPasswordMutation,
    useVerifyCodeMutation,
    useResetPasswordMutation,
    useLazyCheckAuthQuery,
    useLazyRefreshTokenQuery,
} = userApi;
