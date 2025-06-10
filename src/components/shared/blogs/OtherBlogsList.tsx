import { Flex, Grid, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToast } from '~/hooks/use-toast';
import { useGetBloggersQuery } from '~/query/blogs-api';

import { BlogCard } from './BlogCard';

export const OtherBlogsList = ({ currentUserId }: { currentUserId: string }) => {
    const { data: bloggers, isError } = useGetBloggersQuery({
        currentUserId: currentUserId,
        limit: '',
    });
    const { showError } = useToast();

    useEffect(() => {
        if (isError) showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
    }, [isError]);

    if (!bloggers?.others) return null;
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
                <Link to={AppRoutes.BLOGS}>
                    <UiAllAuthorsButton
                        dataTest={DATA_TEST_IDS.BLOGGER_USER_OTHER_BLOGS_BUTTON}
                        size={{ base: 'sm', md: 'lg' }}
                    />
                </Link>
            </Flex>
            <SimpleGrid
                data-test-id={DATA_TEST_IDS.BLOGGER_USER_OTHER_BLOGS_GRID}
                columns={{ sm: 3 }}
                spacing={4}
            >
                {bloggers.others.map((blogger) => (
                    <BlogCard
                        key={blogger._id}
                        bloggerId={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        login={blogger.login}
                        note={blogger.notes[0]?.text}
                        bookmarksCount={blogger.bookmarksCount}
                        subscribersCount={blogger.subscribersCount}
                        newRecipesCount={blogger.newRecipesCount}
                        colsInGrid={3}
                    />
                ))}
            </SimpleGrid>
        </Grid>
    );
};
