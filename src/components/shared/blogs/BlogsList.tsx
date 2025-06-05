import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { UiButton } from '~/components/ui/UiButton';
import { Blogger } from '~/types';

import { BlogCard } from './BlogCard';

export const BlogsList = ({
    data,
    onLoadBloggers,
    limit,
}: {
    data: Blogger[];
    limit: number;
    onLoadBloggers: (limit: 'all') => void;
}) => {
    const [isAllBloggersLoaded, setIsAllBloggersLoaded] = useState(false);
    const [bloggers, setBloggers] = useState<Blogger[] | null>(data);

    const handleHideBloggers = () => {
        setBloggers(bloggers!.slice(0, limit));
        setIsAllBloggersLoaded(false);
    };

    const handleLoadBloggers = () => {
        onLoadBloggers('all');
        setBloggers(data);
        setIsAllBloggersLoaded(true);
    };

    useEffect(() => {
        setBloggers(data);
    }, [data]);

    if (!bloggers) return null;
    return (
        <Grid
            p={{
                base: 3,
                md: 6,
            }}
            bg='neutral.10'
            borderRadius='16px'
            gap={{ base: 4, md: 6 }}
        >
            <SimpleGrid spacing={{ base: 4, md: 6 }} columns={{ base: 1, sm: 2, lg: 3 }}>
                {bloggers.map((blogger) => (
                    <BlogCard
                        key={blogger._id}
                        bloggerId={blogger._id}
                        avatarSrc={avatar_1}
                        name={[blogger.firstName, blogger.lastName]}
                        login={blogger.login}
                        note={blogger.notes[0]?.text}
                        subscribersCount={blogger.subscribersCount}
                        bookmarksCount={blogger.bookmarksCount}
                    />
                ))}
            </SimpleGrid>
            <Box justifySelf='center'>
                {isAllBloggersLoaded ? (
                    <UiButton text='Свернуть' variant='ghost' onClick={handleHideBloggers} />
                ) : (
                    <UiAllAuthorsButton onClick={handleLoadBloggers} />
                )}
            </Box>
        </Grid>
    );
};
