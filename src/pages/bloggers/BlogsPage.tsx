import { Box, Grid } from '@chakra-ui/react';
import { useEffect } from 'react';

import { BlogsFavoritesList } from '~/components/shared/blogs/BlogsFavoritesList';
import { BlogsList } from '~/components/shared/blogs/BlogsList';
import { Slider } from '~/components/shared/slider/Slider';
import { BREAKPOINTS_VALUES } from '~/constants/breakpoints-config';
import { useWindowSize } from '~/hooks/use-window-size';
import { useLazyGetBloggersQuery } from '~/query/blogs-api';
import { Limit } from '~/query/constants/limits';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

export const BlogsPage = () => {
    const userId = useAppSelector(selectCurrentUserId);
    const [getBloggers, { data: bloggers }] = useLazyGetBloggersQuery();
    const { width } = useWindowSize();
    const limit = width > BREAKPOINTS_VALUES.lg ? Limit.BLOGS : Limit.DEFAULT;

    useEffect(() => {
        if (!userId || !limit) return;

        getBloggers({ currentUserId: userId, limit: limit });
    }, [userId]);

    if (!userId || !bloggers) return null;

    return (
        <Box
            as='main'
            padding={{
                base: '16px 16px 32px',
                md: '56px 20px 0',
                lg: '56px 24px 0',
            }}
        >
            <Grid gap={{ base: 8, lg: 10 }}>
                <BlogsFavoritesList bloggers={bloggers?.favorites} heading='Избранные блоги' />
                <BlogsList currentUserId={userId} bloggers={bloggers?.others} />
            </Grid>
            <Box mt={{ base: 3, sm: 8 }}>
                <Slider />
            </Box>
        </Box>
    );
};
