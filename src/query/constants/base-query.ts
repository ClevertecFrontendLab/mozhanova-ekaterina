import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { ApplicationState } from '~/store/configure-store';

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
