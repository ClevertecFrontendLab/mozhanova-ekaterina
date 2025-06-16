import { Avatar, Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';

export const ProfileInfo = ({
    login,
    firstName,
    lastName,
}: {
    login: string;
    firstName: string;
    lastName: string;
}) => {
    const [isLargerThanMD] = useBreakpoint('md');

    return (
        <Flex display={isLargerThanMD ? 'flex' : 'none'}>
            <Link to={AppRoutes.PROFILE}>
                <Flex gap={3}>
                    <Avatar name='Можанова Екатерина' size='md' />

                    <Box>
                        <Box fontSize='18px' fontWeight='500'>
                            {`${firstName} ${lastName}`}
                        </Box>
                        <Box fontSize='14px' color='neutral.400'>
                            {`@${login}`}
                        </Box>
                    </Box>
                </Flex>
            </Link>
        </Flex>
    );
};
