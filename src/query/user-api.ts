import { Note, NoteDto, StatisticDto, UserDto } from '~/types';

import { authorizedApi } from './authorized-api';
import { ApiEndpoints } from './constants/api';
import { EndpointNames } from './constants/endpoint-names';
import { Tags } from './constants/tags';

export const UserApi = authorizedApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_PROFILE]: builder.query<UserDto, void>({
            query: () => ApiEndpoints.USER,
            providesTags: [Tags.USER],
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
    }),
});

export const {
    useGetProfileQuery,
    useGetStatisticsQuery,
    useCreateNotesMutation,
    useDeleteNoteMutation,
} = UserApi;
