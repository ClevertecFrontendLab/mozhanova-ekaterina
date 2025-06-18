import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { UiCardStats } from '~/components/ui/UiCardStats';
import { AppRoutes } from '~/constants/routes-config';

type Props = {
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount?: number;
    bookmarks?: number;
};

export const Hero = ({
    firstName = '',
    lastName = '',
    login = '',
    subscribersCount,
    bookmarks,
}: Props) => (
    <Flex
        gap={6}
        direction={{ base: 'column', sm: 'row' }}
        align='center'
        textAlign={{ base: 'center', sm: 'left' }}
        position='relative'
        my={4}
    >
        <Avatar name={`${firstName} ${lastName}`} size={{ base: 'xl', md: '2xl' }} />
        <Grid gap={3}>
            <Heading fontSize={{ base: '24px', md: '48px' }}>{`${firstName} ${lastName}`}</Heading>
            <Box fontSize={{ base: '14px' }} color='text.secondary'>
                @{login}
            </Box>
            <Flex justify={{ base: 'center', sm: 'flex-start' }}>
                <UiCardStats subscribersCount={subscribersCount} bookmarks={bookmarks} />
            </Flex>
            <IconBox />
        </Grid>
    </Flex>
);

function IconBox() {
    return (
        <Link to={AppRoutes.SETTINGS}>
            <Flex
                align='center'
                justify='center'
                position={{ base: 'absolute' }}
                right={0}
                top={0}
                w='48px'
                h='48px'
                cursor='pointer'
            >
                <SettingsIcon boxSize='24px' />
            </Flex>
        </Link>
    );
}
