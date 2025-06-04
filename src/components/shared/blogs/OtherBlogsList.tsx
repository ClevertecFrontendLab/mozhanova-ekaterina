import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Grid, Heading, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiButton } from '~/components/ui/UiButton';
import { AppRoutes } from '~/constants/routes-config';
import { useGetBloggersQuery } from '~/query/blogs-api';

import { BlogCard } from './BlogCard';

export const OtherBlogsList = ({ currentUserId }: { currentUserId: string }) => {
    const { data: bloggers } = useGetBloggersQuery({ limit: 3, currentUserId });
    return (
        <Grid gap={{ base: 4, md: 6 }} mb={{ base: 4, md: 6 }}>
            <Flex justifyContent='space-between'>
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
                <Link to={AppRoutes.BLOGS}>
                    <UiButton
                        text='Все авторы'
                        variant='primaryGhost'
                        rightIcon={<ArrowForwardIcon />}
                        size='lg'
                    />
                </Link>
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
                        showControls
                        showStats
                    />
                ))}
            </SimpleGrid>
        </Grid>
    );
};
