import { Box, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router';

import avatar from '~/assets/ava.png';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { routeHelpers } from '~/utils/get-routes';

export const ProfileInfo = ({
    login,
    firstName,
    lastName,
    currentUserId,
}: {
    currentUserId: string;
    login: string;
    firstName: string;
    lastName: string;
}) => {
    const [isLargerThanMD] = useBreakpoint('md');

    return (
        <Flex display={isLargerThanMD ? 'flex' : 'none'} gap='12px'>
            <Image width='48px' height='48px' borderRadius='50%' src={avatar} alt='avatar' />
            <div>
                <Link to={routeHelpers.getBlogPath(currentUserId)}>
                    <Box fontSize='18px' fontWeight='500'>
                        {`${firstName} ${lastName}`}
                    </Box>
                </Link>
                <Box fontSize='14px' color='neutral.400'>
                    {`@${login}`}
                </Box>
            </div>
        </Flex>
    );
};
