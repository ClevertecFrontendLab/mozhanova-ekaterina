import { SimpleGrid } from '@chakra-ui/react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { useErrors } from '~/hooks/use-errors';
import { useToggleSubscriptionMutation } from '~/query/blogs-api';
import { Blogger, ErrorResponse } from '~/types';

import { BlogCard } from './BlogCard';

export const BlogsList = ({
    bloggers,
    currentUserId,
}: {
    bloggers: Blogger[] | undefined;
    currentUserId: string;
}) => {
    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();
    const { toggleSubscribeErrorHandler } = useErrors();

    const handleSubscribe = async (bloggerId: string) => {
        try {
            await toggleSubscribe({ fromUserId: currentUserId, toUserId: bloggerId });
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };

    if (!bloggers) return null;

    return (
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
                    toggleSubscribe={() => handleSubscribe(blogger._id)}
                    isCurrentUserSubscribed={blogger.isFavorite}
                    showControls
                    showStats
                    isLoading={isLoading}
                />
            ))}
        </SimpleGrid>
    );
};
