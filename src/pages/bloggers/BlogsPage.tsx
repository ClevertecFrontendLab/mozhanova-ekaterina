import { Box, Grid, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { BlogsFavoritesList } from '~/components/shared/blogs/BlogsFavoritesList';
import { BlogsList } from '~/components/shared/blogs/BlogsList';
import { Slider } from '~/components/shared/slider/Slider';
import { BREAKPOINTS_VALUES } from '~/constants/breakpoints-config';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { useToast } from '~/hooks/use-toast';
import { useWindowSize } from '~/hooks/use-window-size';
import { useLazyGetBloggersQuery } from '~/query/blogs-api';
import { Limit } from '~/query/constants/limits';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { GetBloggersParams } from '~/types';

export const BlogsPage = () => {
    const userId = useAppSelector(selectCurrentUserId);
    const { width } = useWindowSize();
    const limit = width > BREAKPOINTS_VALUES.lg ? Limit.BLOGS : Limit.DEFAULT;
    const [loadBloggers, { data: bloggers, error }] = useLazyGetBloggersQuery();

    const handleLoadBloggers = async (limit: GetBloggersParams['limit']) => {
        await loadBloggers({ currentUserId: userId, limit });
    };

    const { showError } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
            navigate(AppRoutes.HOME);
        }
    }, [error]);

    useEffect(() => {
        if (!userId) return;
        handleLoadBloggers(limit);
    }, []);

    if (!userId || !bloggers) return null;

    return (
        <Box
            as='main'
            padding={{
                base: '16px 16px 32px',
                md: '32px 20px 0',
                lg: '32px 24px 0',
            }}
        >
            <Heading textAlign='center' fontSize={{ base: '24px', md: '48px' }} mb={6}>
                Кулинарные блоги
            </Heading>
            <Grid gap={{ base: 8, lg: 10 }}>
                <BlogsFavoritesList bloggers={bloggers.favorites} heading='Избранные блоги' />
                <BlogsList
                    limit={limit}
                    onLoadBloggers={handleLoadBloggers}
                    data={bloggers.others}
                />
            </Grid>
            <Box mt={{ base: 3, sm: 8 }}>
                <Slider />
            </Box>
        </Box>
    );
};
