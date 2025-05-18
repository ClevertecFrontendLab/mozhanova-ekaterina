import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Измените импорт

import { API_BASE_URL } from '~/config';
import { ApplicationState } from '~/store/configure-store';
import { setAuthenticated, setCredentials } from '~/store/user-slice';
import { TAuth, TAuthResponse, TNewUser, TRecoverUser, TVerifyUser } from '~/types';

import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

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
        [EndpointNames.SIGN_IN]: builder.mutation<TAuthResponse, TAuth>({
            query: (credentials) => ({
                url: ApiEndpoints.AUTH,
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    const accessToken = (
                        meta as { response: { headers: Headers } }
                    )?.response?.headers.get('Authentication-Access');

                    if (accessToken) {
                        dispatch(setCredentials(accessToken));
                    }
                } catch (_error) {
                    dispatch(setCredentials(null));
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

        [EndpointNames.CHECK_AUTH]: builder.query<TAuthResponse, void>({
            query: () => ({
                url: ApiEndpoints.CHECK_AUTH,
                method: 'GET',
            }),
            providesTags: [Tags.AUTH],
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        dispatch(setAuthenticated(true));
                    }
                } catch (_error) {
                    dispatch(setAuthenticated(false));
                }
            },
        }),

        [EndpointNames.FORGOT_PASSWORD]: builder.mutation<TAuthResponse, string>({
            query: (email) => ({
                url: ApiEndpoints.FORGOT_PASSWORD,
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.VERIFY_OTP]: builder.mutation<TAuthResponse, TVerifyUser>({
            query: ({ email, otpToken }) => ({
                url: ApiEndpoints.VERIFY_OTP,
                method: 'POST',
                body: { email, otpToken },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.RESET_PASSWORD]: builder.mutation<TAuthResponse, TRecoverUser>({
            query: ({ email, login, password, passwordConfirm }) => ({
                url: ApiEndpoints.RESET_PASSWORD,
                method: 'POST',
                body: { email, login, password, passwordConfirm },
            }),
            invalidatesTags: [Tags.AUTH],
        }),

        [EndpointNames.REFRESH_TOKEN]: builder.query<TAuthResponse, void>({
            query: () => ({
                url: ApiEndpoints.REFRESH_TOKEN,
                method: 'GET',
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    const accessToken = (
                        meta as { response: { headers: Headers } }
                    )?.response?.headers.get('Authentication-Access');

                    if (accessToken) {
                        dispatch(setCredentials(accessToken));
                    }
                } catch (_error) {
                    dispatch(setCredentials(null));
                }
            },
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useCheckAuthQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useLazyCheckAuthQuery,
    useLazyRefreshTokenQuery,
} = userApi;
