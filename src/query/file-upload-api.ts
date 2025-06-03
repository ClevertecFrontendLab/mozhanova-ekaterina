import { MediaResponse } from '~/types';

import { ApiEndpoints } from './constants/api';
import { unauthorizedApi } from './unauthorized-api';

export const fileUploadApi = unauthorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        fileUpload: builder.mutation<MediaResponse, FormData>({
            query: (file) => ({
                url: ApiEndpoints.FILE_UPLOAD,
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const { useFileUploadMutation } = fileUploadApi;
