import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import avatar from '~/assets/ava_1.png';
import { useErrors } from '~/hooks/use-errors';
import { useGetBloggerByIdQuery, useToggleSubscriptionMutation } from '~/query/blogs-api';
import { ErrorResponse } from '~/types';
import { routeHelpers } from '~/utils/get-routes';

import { ManIcon } from '../ui/icons/ManIcon';
import { PeopleOutlineIcon } from '../ui/icons/PeopleOutlineIcon';
import { PeoplePlusIcon } from '../ui/icons/PeoplePlusIcon';
import { UiButton } from '../ui/UiButton';

export const AuthorInfo = ({
    authorId,
    currentUserId,
}: {
    authorId: string;
    currentUserId: string;
}) => {
    const { data: author } = useGetBloggerByIdQuery(
        { bloggerId: authorId, currentUserId },
        { skip: !authorId },
    );
    const { toggleSubscribeErrorHandler } = useErrors();
    const [toggleSubscribe] = useToggleSubscriptionMutation();

    const handleSubscribe = async () => {
        try {
            await toggleSubscribe({
                fromUserId: currentUserId,
                toUserId: authorId,
            });
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };

    if (!author) return null;
    return (
        <Flex
            p={{ base: 3, sm: 6 }}
            borderRadius='8px'
            bgColor='primary.200'
            gap={{ base: 2, sm: 4 }}
            position='relative'
            mb={{ base: 10, md: 8 }}
        >
            <Image w='96px' h='96px' borderRadius='50%' src={avatar} alt='avatar' />
            <Flex direction='column' grow={1}>
                <Link to={routeHelpers.getBlogPath(author.bloggerInfo._id)}>
                    <Heading mt={2} fontSize='lg' fontWeight={600}>
                        {`${author.bloggerInfo.firstName} ${author.bloggerInfo.lastName}`}
                    </Heading>
                </Link>
                <Text
                    position='absolute'
                    top={{ base: '8px', sm: '24px' }}
                    right={{ base: '8px', sm: '24px' }}
                    fontSize={{ base: 'xs', sm: 'sm' }}
                >
                    Автор рецепта
                </Text>
                <Text fontSize='sm' color='neutral.300'>
                    {`@${author.bloggerInfo.login}`}
                </Text>
                <Flex mt={{ base: 4 }} justifyContent='space-between' alignItems='center'>
                    {author.isFavorite ? (
                        <UiButton
                            onClick={handleSubscribe}
                            leftIcon={<ManIcon />}
                            size='xs'
                            variant='outline'
                            text='Вы подписаны'
                        />
                    ) : (
                        <UiButton
                            size='xs'
                            leftIcon={<PeoplePlusIcon />}
                            variant='solid'
                            text='Подписаться'
                            onClick={handleSubscribe}
                        />
                    )}

                    <Flex alignItems='center' gap='6px'>
                        <PeopleOutlineIcon />
                        <Text fontWeight={600} fontSize='xs' color='primary.700'>
                            {author.totalSubscribers}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
