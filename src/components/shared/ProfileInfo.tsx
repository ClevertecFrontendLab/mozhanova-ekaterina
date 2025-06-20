import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useGetProfileQuery, useGetStatisticsQuery } from '~/query/user-api';
import { setStatistics, setUser } from '~/store/user-slice';

import { UiAvatar } from '../ui/UiAvatar';

export const ProfileInfo = () => {
    const [isLargerThanMD] = useBreakpoint('md');
    const dispatch = useDispatch();
    const { data: profile } = useGetProfileQuery();
    const { data: statistics } = useGetStatisticsQuery();

    useEffect(() => {
        if (!profile || !statistics) return;
        dispatch(setUser(profile));
        dispatch(setStatistics(statistics));
    }, [profile, statistics]);

    if (!profile) return null;
    return (
        <Flex display={isLargerThanMD ? 'flex' : 'none'}>
            <Link to={AppRoutes.PROFILE}>
                <Flex gap={3}>
                    <UiAvatar
                        size='md'
                        src={API_IMAGE_URL + profile?.photoLink}
                        firstName={profile?.firstName}
                        lastName={profile?.lastName}
                    />
                    <Box>
                        <Box fontSize='18px' fontWeight='500'>
                            {`${profile?.firstName || ''} ${profile?.lastName || ''}`}
                        </Box>
                        <Box fontSize='14px' color='neutral.400'>
                            {`@${profile?.login}`}
                        </Box>
                    </Box>
                </Flex>
            </Link>
        </Flex>
    );
};
