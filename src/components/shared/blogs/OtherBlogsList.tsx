import { Flex, Grid, Heading, SimpleGrid } from '@chakra-ui/react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { useGetBloggersQuery } from '~/query/blogs-api';

import { BlogCard } from './BlogCard';

export const OtherBlogsList = ({ currentUserId }: { currentUserId: string }) => {
    const { data: bloggers } = useGetBloggersQuery({ limit: 3, currentUserId });
    return (
        <Grid gap={{ base: 4, md: 6 }} mb={{ base: 4, md: 6 }}>
            <Flex justify='space-between' align='center'>
                <Heading
                    as='h2'
                    fontSize={{
                        base: '24px',
                        md: '36px',
                    }}
                    fontWeight='500'
                >
                    Кулинарные блоги
                </Heading>
                <UiAllAuthorsButton size={{ base: 'sm', md: 'lg' }} />
            </Flex>
            <SimpleGrid columns={{ sm: 3 }} spacing={4}>
                {bloggers?.others.map((blogger) => (
                    <BlogCard
                        key={blogger._id}
                        bloggerId={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        login={blogger.login}
                        note={blogger.notes[0]?.text}
                        avatarSrc={avatar_1}
                        bookmarksCount={blogger.bookmarksCount}
                        subscribersCount={blogger.subscribersCount}
                        newRecipesCount={blogger.newRecipesCount}
                        colsInGrid={3}
                        showControls
                        showStats
                    />
                ))}
            </SimpleGrid>
        </Grid>
    );
};
