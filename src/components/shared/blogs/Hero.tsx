import { Box, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';

import avatar_1 from '~/assets/blog_avatar_1.png';
import { SubscribeIcon } from '~/components/ui/icons/SubscribeIcon';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { UiLoader } from '~/components/ui/UiLoader';
import { UiSubscribedButton } from '~/components/ui/UiSubscribedButton';
import { useErrors } from '~/hooks/use-errors';
import { useToggleSubscriptionMutation } from '~/query/blogs-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { BloggerResponse, ErrorResponse } from '~/types';

export const Hero = ({ blogger }: { blogger: BloggerResponse }) => {
    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const { toggleSubscribeErrorHandler } = useErrors();

    const handleSubscribe = async () => {
        try {
            await toggleSubscribe({
                fromUserId: currentUserId,
                toUserId: blogger.bloggerInfo._id,
            });
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };

    return (
        <Box position='relative' pb={{ base: 4, md: 6 }}>
            <Flex align='center' direction={{ base: 'column', sm: 'row' }} gap={6}>
                <Box flexBasis='65%'>
                    <Image
                        w={{ base: '96px', md: '128px' }}
                        h={{ base: '96px', md: '128px' }}
                        src={avatar_1}
                        rounded='full'
                        ml={{ sm: 'auto' }}
                    />
                </Box>
                <Box w='100%'>
                    <Box textAlign={{ base: 'center', sm: 'left' }} mb={4}>
                        <Heading
                            mb={3}
                            fontSize={{ base: '24px', md: '48px' }}
                        >{`${blogger.bloggerInfo.firstName} ${blogger.bloggerInfo.lastName}`}</Heading>
                        <Text color='text.secondary' fontSize='14px'>
                            @{blogger.bloggerInfo.login}
                        </Text>
                    </Box>
                    <Flex
                        justify={{ base: 'space-between', sm: 'flex-start' }}
                        align='center'
                        w='100%'
                        gap={{ sm: '57px' }}
                    >
                        {blogger.isFavorite ? (
                            <Tooltip
                                hasArrow
                                placement='bottom-end'
                                label={
                                    <>
                                        <p>Нажмите, если</p>
                                        <p>хотите отписаться</p>
                                    </>
                                }
                            >
                                <UiSubscribedButton onClick={handleSubscribe} />
                            </Tooltip>
                        ) : (
                            <UiButton
                                onClick={handleSubscribe}
                                leftIcon={<SubscribeIcon />}
                                size='xs'
                                variant='solid'
                                text='Подписаться'
                            />
                        )}

                        <UiCardStats
                            bookmarks={blogger.totalBookmarks}
                            subscribersCount={blogger.totalSubscribers}
                        />
                    </Flex>
                </Box>
            </Flex>
            {isLoading && <UiLoader />}
        </Box>
    );
};
