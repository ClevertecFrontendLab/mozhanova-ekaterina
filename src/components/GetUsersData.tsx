import { useGetAllUsersQuery, useGetProfileQuery, useGetStatisticsQuery } from '~/query/user-api';

import { GlobalLoader } from './GlobalLoader';

export const GetUsersData = ({ children }: { children?: React.ReactNode }) => {
    const { isLoading: isProfileLoading } = useGetProfileQuery();
    const { isLoading: isStatisticsLoading } = useGetStatisticsQuery();
    const { isLoading: isAllUsersLoading } = useGetAllUsersQuery();

    if (isProfileLoading || isStatisticsLoading || isAllUsersLoading) return <GlobalLoader />;

    return <>{children}</>;
};
