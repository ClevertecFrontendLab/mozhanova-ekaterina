import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useGetBloggerByIdQuery } from '~/query/blogs-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

import { ProfileNotification } from './shared/ProfileNotification';
import { UiIconButton } from './ui/UiIconButton';

export const Sidebar = () => {
    const location = useLocation();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const { data: currentUser } = useGetBloggerByIdQuery(
        { bloggerId: currentUserId, currentUserId },
        { skip: !currentUserId },
    );
    if (!currentUser) return null;
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
                        totalBookmarks={currentUser.totalBookmarks}
                        totalSubscribers={currentUser.totalSubscribers}
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
