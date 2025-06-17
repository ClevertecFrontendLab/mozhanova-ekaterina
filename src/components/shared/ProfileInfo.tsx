import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useGetProfileQuery } from '~/query/user-api';
import { setUser } from '~/store/user-slice';

export const ProfileInfo = () => {
    const [isLargerThanMD] = useBreakpoint('md');
    const dispatch = useDispatch();
    const { data: profile } = useGetProfileQuery();

    useEffect(() => {
        if (!profile) return;
        dispatch(setUser(profile));
    }, [profile]);

    if (!profile) return null;
    return (
        <Flex display={isLargerThanMD ? 'flex' : 'none'}>
            <Link to={AppRoutes.PROFILE}>
                <Flex gap={3}>
                    <Avatar
                        name={`${profile?.firstName || ''} ${profile?.lastName || ''}`}
                        size='md'
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
