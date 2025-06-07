import { Box, Flex, Image } from '@chakra-ui/react';

import avatar from '~/assets/ava.jpg';
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
        <Flex display={isLargerThanMD ? 'flex' : 'none'} gap='12px'>
            <Image width='48px' height='48px' borderRadius='50%' src={avatar} alt='avatar' />
            <div>
                <Box fontSize='18px' fontWeight='500'>
                    {`${firstName} ${lastName}`}
                </Box>
                <Box fontSize='14px' color='neutral.400'>
                    {`@${login}`}
                </Box>
            </div>
        </Flex>
    );
};
