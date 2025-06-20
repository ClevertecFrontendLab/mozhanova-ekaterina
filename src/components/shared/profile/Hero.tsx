import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { UiAvatar } from '~/components/ui/UiAvatar';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { AppRoutes } from '~/constants/routes-config';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useAppSelector } from '~/store/hooks';
import { selectStatisticsCounts } from '~/store/selectors';

type Props = {
    firstName: string;
    lastName: string;
    login: string;
    avatar?: string;
};

export const Hero = ({ firstName = '', lastName = '', login = '', avatar }: Props) => {
    const statistics = useAppSelector(selectStatisticsCounts);
    return (
        <Flex
            gap={6}
            direction={{ base: 'column', sm: 'row' }}
            align='center'
            textAlign={{ base: 'center', sm: 'left' }}
            position='relative'
            my={4}
        >
            <UiAvatar src={API_IMAGE_URL + avatar} firstName={firstName} lastName={lastName} />
            <Grid gap={3}>
                <Heading
                    fontSize={{ base: '24px', md: '48px' }}
                >{`${firstName} ${lastName}`}</Heading>
                <Box fontSize={{ base: '14px' }} color='text.secondary'>
                    @{login}
                </Box>
                <Flex justify={{ base: 'center', sm: 'flex-start' }}>
                    <UiCardStats
                        subscribersCount={statistics.subscribersCount}
                        bookmarks={statistics.bookmarks}
                    />
                </Flex>
                <IconBox />
            </Grid>
        </Flex>
    );
};

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
