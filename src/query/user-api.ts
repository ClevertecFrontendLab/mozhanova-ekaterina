import { Note, NoteDto, StatisticDto, UpdatePassword, UserDto, UserUpdateInfo } from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const UserApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_PROFILE]: builder.query<UserDto, void>({
            query: () => ApiEndpoints.USER,
            providesTags: [Tags.USER, Tags.USER_INFO],
        }),
        [EndpointNames.GET_STATISTICS]: builder.query<StatisticDto, void>({
            query: () => ApiEndpoints.STATISTIC,
            providesTags: [Tags.USER],
        }),
        [EndpointNames.CREATE_NOTES]: builder.mutation<NoteDto, Note>({
            query: (note) => ({
                url: ApiEndpoints.USER_NOTES,
                method: 'POST',
                body: note,
            }),
            invalidatesTags: [Tags.USER_RECIPES],
        }),
        [EndpointNames.DELETE_NOTE]: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ApiEndpoints.USER_NOTES}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [Tags.USER_RECIPES],
        }),
        [EndpointNames.UPDATE_INFO]: builder.mutation<UserUpdateInfo, UserUpdateInfo>({
            query: (userInfo) => ({
                url: ApiEndpoints.UPDATE_USER_INFO,
                method: 'PATCH',
                body: userInfo,
            }),
            invalidatesTags: [Tags.USER_INFO],
        }),
        [EndpointNames.UPDATE_PASSWORD]: builder.mutation<void, UpdatePassword>({
            query: (password) => ({
                url: ApiEndpoints.UPDATE_PASSWORD,
                method: 'PATCH',
                body: password,
            }),
        }),
        [EndpointNames.UPLOAD_USER_PHOTO]: builder.mutation<{ photoLink: string }, FormData>({
            query: (file) => ({
                url: ApiEndpoints.USER_PHOTO,
                method: 'POST',
                body: file,
            }),
            invalidatesTags: [Tags.USER_INFO],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetStatisticsQuery,
    useCreateNotesMutation,
    useDeleteNoteMutation,
    useUpdateInfoMutation,
    useUpdatePasswordMutation,
    useUploadUserPhotoMutation,
} = UserApi;
