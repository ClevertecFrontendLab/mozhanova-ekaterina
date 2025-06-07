import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { ApplicationState } from '~/store/configure-store';
import { setCredentials } from '~/store/user-slice';

import { ApiEndpoints } from './api';
import { API_BASE_URL } from './api-config';

export const baseQuery = fetchBaseQuery({
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

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        const refreshResult = await baseQuery(
            {
                url: ApiEndpoints.REFRESH_TOKEN,
                method: 'GET',
            },
            api,
            extraOptions,
        );

        if (refreshResult.meta?.response?.ok) {
            const accessToken = refreshResult.meta.response.headers?.get('Authentication-Access');

            api.dispatch(accessToken ? setCredentials(accessToken) : setCredentials(null));

            result = await baseQuery(args, api, extraOptions);
        } else {
            // api.dispatch(logout());
        }
    }
    return result;
};
