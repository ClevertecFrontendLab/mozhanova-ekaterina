import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useToast } from '~/hooks/use-toast';
import { useLazyGetBloggersQuery } from '~/query/blogs-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

import { BlogCard } from './BlogCard';

export const BlogsSection = () => {
    const userId = useAppSelector(selectCurrentUserId);
    const { showError } = useToast();
    const [isLargerThanMD] = useBreakpoint('md');

    const [getBloggers, { data: bloggers, error }] = useLazyGetBloggersQuery();

    useEffect(() => {
        if (!userId) return;
        getBloggers({ currentUserId: userId, limit: '' });
    }, [userId]);

    useEffect(() => {
        if (error) showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
    }, [error]);

    if (!bloggers?.others) return null;

    return (
        <Flex
            data-test-id={DATA_TEST_IDS.MAIN_PAGE_BLOGS_BOX}
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
                    Кулинарные блоги
                </Heading>

                {isLargerThanMD && (
                    <Link data-test-id={DATA_TEST_IDS.MAIN_PAGE_BLOGS_BUTTON} to={AppRoutes.BLOGS}>
                        <UiAllAuthorsButton />
                    </Link>
                )}
            </Flex>
            <SimpleGrid
                data-test-id={DATA_TEST_IDS.MAIN_PAGE_BLOGS_GRID}
                columns={{
                    base: 1,
                    sm: 3,
                }}
                gap={{
                    base: 3,
                    md: 4,
                }}
            >
                {bloggers.others.map((blogger) => (
                    <BlogCard
                        bloggerId={blogger._id}
                        avatarSrc={avatar_1}
                        key={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        note={blogger.notes[0]?.text}
                        login={blogger.login}
                        newRecipesCount={blogger.newRecipesCount}
                        showFooter={false}
                    />
                ))}
            </SimpleGrid>
            {!isLargerThanMD && (
                <Flex justify='center'>
                    <Link to={AppRoutes.BLOGS}>
                        <UiAllAuthorsButton />
                    </Link>
                </Flex>
            )}
        </Flex>
    );
};
