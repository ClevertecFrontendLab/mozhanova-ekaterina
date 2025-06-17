import { StatisticDto, UserDto } from '~/types';

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
    }),
});

export const { useGetProfileQuery, useGetStatisticsQuery } = UserApi;
