import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { UiButton } from '~/components/ui/UiButton';
import { NOTIFICATION_MESSAGES } from '~/constants/notification-config';
import { AppRoutes } from '~/constants/routes-config';
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
                {isLargerThanMD && (
                    <Link to={AppRoutes.BLOGS}>
                        <UiButton
                            text='Все авторы'
                            variant='primaryGhost'
                            rightIcon={<ArrowForwardIcon />}
                            size='lg'
                        />
                    </Link>
                )}
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
                        avatarSrc={avatar_1}
                        key={blogger._id}
                        name={[blogger.firstName, blogger.lastName]}
                        note={blogger.notes[0]?.text}
                        login={blogger.login}
                        newRecipesCount={blogger.newRecipesCount}
                    />
                ))}
            </SimpleGrid>
            {!isLargerThanMD && (
                <Link to={AppRoutes.BLOGS}>
                    <UiButton
                        text='Все авторы'
                        variant='primaryGhost'
                        rightIcon={<ArrowForwardIcon />}
                        size='md'
                    />
                </Link>
            )}
        </Flex>
    );
};
