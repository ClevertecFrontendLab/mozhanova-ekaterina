import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';

import { ProfileNotification } from './shared/ProfileNotification';
import { UiIconButton } from './ui/UiIconButton';

export const Sidebar = () => {
    const location = useLocation();
    return (
        <Flex
            position='relative'
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            h='100%'
            pt={4}
        >
            {location.pathname !== AppRoutes.CREATE_RECIPE && (
                <>
                    <ProfileNotification
                        totalLikes={1000}
                        totalBookmarks={200}
                        totalSubscribers={100}
                    />
                    <Box position='absolute' bottom='52px' left={0} right={0}>
                        <Link
                            to={AppRoutes.CREATE_RECIPE}
                            data-test-id={DATA_TEST_IDS.ADD_RECIPE_BUTTON}
                        >
                            <UiIconButton
                                text='Записать рецепт'
                                icon={<EditIcon width='24px' height='24px' />}
                                variant='primary'
                            />
                        </Link>
                    </Box>
                </>
            )}
        </Flex>
    );
};
