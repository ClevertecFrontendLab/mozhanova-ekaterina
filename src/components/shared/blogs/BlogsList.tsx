import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Blogger, GetBloggersParams } from '~/types';

import { BlogCard } from './BlogCard';

export const BlogsList = ({
    data,
    onLoadBloggers,
    limit,
}: {
    data: Blogger[];
    limit: number;
    onLoadBloggers: (limit: GetBloggersParams['limit']) => void;
}) => {
    const [isAllBloggersLoaded, setIsAllBloggersLoaded] = useState(false);
    const [bloggers, setBloggers] = useState<Blogger[] | null>(data);

    const handleLoadBloggers = () => {
        if (isAllBloggersLoaded) {
            onLoadBloggers(limit);
            setBloggers(bloggers!.slice(0, limit));
            setIsAllBloggersLoaded(false);
        } else {
            onLoadBloggers('all');
            setBloggers(data);
            setIsAllBloggersLoaded(true);
        }
    };

    useEffect(() => {
        setBloggers(data);
    }, [data]);

    if (!bloggers) return null;
    return (
        <Grid
            data-test-id={DATA_TEST_IDS.BLOG_OTHERS_BOX}
            p={{
                base: 3,
                md: 6,
            }}
            bg='neutral.10'
            borderRadius='16px'
            gap={{ base: 4, md: 6 }}
        >
            <SimpleGrid
                data-test-id={DATA_TEST_IDS.BLOG_OTHERS_GRID}
                spacing={{ base: 4, md: 6 }}
                columns={{ base: 1, sm: 2, lg: 3 }}
            >
                {bloggers.map((blogger) => (
                    <BlogCard
                        key={blogger._id}
                        bloggerId={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        login={blogger.login}
                        note={blogger.notes[0]?.text}
                        subscribersCount={blogger.subscribersCount}
                        bookmarksCount={blogger.bookmarksCount}
                    />
                ))}
            </SimpleGrid>
            <Box justifySelf='center'>
                <UiAllAuthorsButton
                    dataTest={DATA_TEST_IDS.BLOG_OTHERS_BUTTON}
                    text={isAllBloggersLoaded ? 'Свернуть' : 'Все авторы'}
                    onClick={handleLoadBloggers}
                />
            </Box>
        </Grid>
    );
};
