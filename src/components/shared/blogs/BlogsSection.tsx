import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiAllAuthorsButton } from '~/components/ui/UiAllAuthorsButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useToast } from '~/hooks/use-toast';
import { useLazyGetBloggersQuery } from '~/query/blogs-api';
import { Limit } from '~/query/constants/limits';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';

import { BlogCard } from './BlogCard';

export const BlogsSection = () => {
    const userId = useAppSelector(selectCurrentUserId);
    const { showError } = useToast();
    const [isLargerThanMD] = useBreakpoint('md');

    const [getBloggers, { data: bloggers }] = useLazyGetBloggersQuery();

    useEffect(() => {
        if (!userId) return;
        try {
            getBloggers({ currentUserId: userId, limit: Limit.BLOGS_HOME });
        } catch {
            showError(NOTIFICATION_MESSAGES.SERVER_ERROR);
        }
    }, [userId]);

    if (!bloggers) return null;

    return (
        <Flex
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
                {isLargerThanMD && <UiAllAuthorsButton />}
            </Flex>
            <SimpleGrid
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
            {!isLargerThanMD && <UiAllAuthorsButton size='sm' />}
        </Flex>
    );
};
