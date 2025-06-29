import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

import { UiAvatar } from '~/components/ui/UiAvatar';
import { UiUserStats } from '~/components/ui/UiUserStats';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
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
            data-test-id={DATA_TEST_IDS.USER_PROFILE_BOX}
        >
            <UiAvatar src={API_IMAGE_URL + avatar} firstName={firstName} lastName={lastName} />
            <Grid gap={3}>
                <Heading
                    data-test-id={DATA_TEST_IDS.USER_PROFILE_NAME}
                    fontSize={{ base: '24px', md: '48px' }}
                >{`${firstName} ${lastName}`}</Heading>
                <Box
                    data-test-id={DATA_TEST_IDS.USER_PROFILE_LOGIN}
                    fontSize={{ base: '14px' }}
                    color='text.secondary'
                >
                    @{login}
                </Box>
                <Flex
                    data-test-id='user-profile-stats-block'
                    justify={{ base: 'center', sm: 'flex-start' }}
                >
                    <UiUserStats {...statistics} />
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
                data-test-id={DATA_TEST_IDS.SETTINGS_BUTTON}
            >
                <SettingsIcon boxSize='24px' />
            </Flex>
        </Link>
    );
}
