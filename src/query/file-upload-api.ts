import { createApi } from '@reduxjs/toolkit/query/react';

import { MediaResponse } from '~/types';

import { ApiEndpoints } from './constants/api';
import { baseQuery } from './constants/base-query';
import { EndpointNames } from './constants/endpoint-names';

export const fileUploadApi = createApi({
    reducerPath: 'fileUploadApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        [EndpointNames.FILE_UPLOAD]: builder.mutation<MediaResponse, FormData>({
            query: (file) => ({
                url: ApiEndpoints.FILE_UPLOAD,
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const { useFileUploadMutation } = fileUploadApi;
