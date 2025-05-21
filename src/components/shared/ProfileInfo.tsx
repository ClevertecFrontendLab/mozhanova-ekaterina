import { Box, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import avatar from '~/assets/ava.png';
import { ApplicationState } from '~/store/configure-store';

export const ProfileInfo = () => {
    const [isLargerThanMD] = useMediaQuery('(min-width: 1001px)', { ssr: false });
    const isVisible =
        useSelector((state: ApplicationState) => state.user.accessToken) && isLargerThanMD;

    return (
        <Flex display={isVisible ? 'flex' : 'none'} gap='12px'>
            <Image width='48px' height='48px' borderRadius='50%' src={avatar} alt='avatar' />
            <div>
                <Box fontSize='18px' fontWeight='500'>
                    Екатерина Константинопольская
                </Box>
                <Box fontSize='14px' color='neutral.400'>
                    @bake_and_pie
                </Box>
            </div>
        </Flex>
    );
};
