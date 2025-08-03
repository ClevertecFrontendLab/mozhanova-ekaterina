import { useEffect } from 'react';

import {
    useLazyGetAllUsersQuery,
    useLazyGetProfileQuery,
    useLazyGetStatisticsQuery,
} from '~/query/user-api';
import { useAppSelector } from '~/store/hooks';
import { accessToken } from '~/store/user-slice';

import { GlobalLoader } from './GlobalLoader';

export const GetUsersData = ({ children }: { children?: React.ReactNode }) => {
    const [getProfile, { isLoading: isProfileLoading }] = useLazyGetProfileQuery();
    const [getStatistics, { isLoading: isStatisticsLoading }] = useLazyGetStatisticsQuery();
    const [getAllUsers, { isLoading: isAllUsersLoading }] = useLazyGetAllUsersQuery();

    const token = useAppSelector(accessToken);

    useEffect(() => {
        if (token) {
            getProfile();
            getStatistics();
            getAllUsers();
        }
    }, [token]);

    if (isProfileLoading || isStatisticsLoading || isAllUsersLoading) return <GlobalLoader />;

    return <>{children}</>;
};
