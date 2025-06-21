import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { API_IMAGE_URL } from '~/query/constants/api-config';

import { UiAvatar } from '../ui/UiAvatar';

type Props = {
    firstName: string;
    lastName: string;
    login: string;
    photoLink: string;
};

export const ProfileInfo = ({ firstName, lastName, login, photoLink }: Partial<Props>) => {
    const [isLargerThanMD] = useBreakpoint('md');

    return (
        <Flex display={isLargerThanMD ? 'flex' : 'none'}>
            <Link to={AppRoutes.PROFILE}>
                <Flex gap={3}>
                    <UiAvatar
                        size='md'
                        src={photoLink && `${API_IMAGE_URL}${photoLink}`}
                        firstName={firstName}
                        lastName={lastName}
                    />
                    <Box>
                        <Box fontSize='18px' fontWeight='500'>
                            {`${firstName || ''} ${lastName || ''}`}
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
