import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { Blogger } from '~/types';

import { BlogCard } from './BlogCard';

export const BlogsFavoritesList = ({
    bloggers,
    heading,
}: {
    bloggers: Blogger[] | undefined;
    heading?: string;
}) => {
    if (!bloggers || bloggers?.length === 0) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.BLOG_FAVORITES_BOX}
            direction='column'
            bg='primary.200'
            p={{
                base: 3,
                md: 6,
            }}
            borderRadius='16px'
            gap={{
                base: 3,
                md: 4,
            }}
        >
            <Flex justifyContent='space-between'>
                <Heading
                    as='h2'
                    fontSize={{
                        base: '24px',
                        md: '36px',
                    }}
                    fontWeight='500'
                >
                    {heading}
                </Heading>
            </Flex>
            <SimpleGrid
                data-test-id={DATA_TEST_IDS.BLOG_FAVORITES_GRID}
                columns={{
                    base: 1,
                    sm: 2,
                    md: bloggers.length > 6 ? 3 : 2,
                }}
                gap={{
                    base: 3,
                    md: 4,
                }}
            >
                {bloggers.map((blogger) => (
                    <BlogCard
                        avatarSrc={avatar_1}
                        key={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        note={blogger.notes[0]?.text}
                        login={blogger.login}
                        newRecipesCount={blogger.newRecipesCount}
                        bloggerId={blogger._id}
                        bookmarksCount={blogger.bookmarksCount}
                        subscribersCount={blogger.subscribersCount}
                        isFavorite
                    />
                ))}
            </SimpleGrid>
        </Flex>
    );
};
