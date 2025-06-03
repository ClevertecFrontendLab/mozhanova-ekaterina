import { Box, Grid } from '@chakra-ui/react';
import { useEffect } from 'react';

import { BlogsFavoritesList } from '~/components/shared/blogs/BlogsFavoritesList';
import { BlogsList } from '~/components/shared/blogs/BlogsList';
import { Slider } from '~/components/shared/slider/Slider';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useLazyGetBloggersQuery } from '~/query/blogs-api';
import { Limit } from '~/query/constants/limits';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

export const BlogsPage = () => {
    const userId = useAppSelector(selectCurrentUserId);
    const isLargerThanLG = useBreakpoint('lg');
    const [getBloggers, { data: bloggers }] = useLazyGetBloggersQuery();

    const limit = isLargerThanLG ? Limit.BLOGS : Limit.DEFAULT; //???:

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
                <BlogsList
                    currentUserId={userId}
                    bloggers={bloggers?.others.concat(bloggers?.favorites)}
                />
            </Grid>
            <Box mt={{ base: 3, sm: 8 }}>
                <Slider />
            </Box>
        </Box>
    );
};
