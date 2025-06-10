import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './constants/base-query';
import { Tags } from './constants/tags';

export const authorizedApi = createApi({
    reducerPath: 'authorized-api',
    baseQuery: baseQueryWithReauth,
    tagTypes: Object.values(Tags),
    endpoints: () => ({}),
});
