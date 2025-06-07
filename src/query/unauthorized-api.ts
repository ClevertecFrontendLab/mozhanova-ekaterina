import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './constants/base-query';
import { Tags } from './constants/tags';

export const unauthorizedApi = createApi({
    reducerPath: 'unauthorized-api',
    baseQuery: baseQuery,
    tagTypes: Object.values(Tags),
    endpoints: () => ({}),
});
