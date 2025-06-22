import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useGetAllUsersQuery, useGetProfileQuery, useGetStatisticsQuery } from '~/query/user-api';
import { setAllUsers, setStatistics, setUser } from '~/store/user-slice';

import { GlobalLoader } from './GlobalLoader';

export const GetUsersData = ({ children }: { children?: React.ReactNode }) => {
    const dispatch = useDispatch();

    const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
    const { data: statistics, isLoading: isStatisticsLoading } = useGetStatisticsQuery();
    const { data: allUsers, isLoading: isAllUsersLoading } = useGetAllUsersQuery();

    useEffect(() => {
        if (!profile || !statistics || !allUsers) return;
        dispatch(setUser(profile));
        dispatch(setStatistics(statistics));
        dispatch(setAllUsers(allUsers));
    }, [profile, statistics, allUsers]);

    if (isProfileLoading || isStatisticsLoading || isAllUsersLoading) return <GlobalLoader />;

    return <>{children}</>;
};
