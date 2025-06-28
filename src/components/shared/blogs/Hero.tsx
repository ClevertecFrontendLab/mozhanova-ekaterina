import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ManIcon } from '~/components/ui/icons/ManIcon';
import { SubscribeIcon } from '~/components/ui/icons/SubscribeIcon';
import { UiAvatar } from '~/components/ui/UiAvatar';
import { UiButton } from '~/components/ui/UiButton';
import { UiLoader } from '~/components/ui/UiLoader';
import { UiUserStats } from '~/components/ui/UiUserStats';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useToggleSubscriptionMutation } from '~/query/blogs-api';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useErrors } from '~/query/hooks/use-errors';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { BloggerResponse, ErrorResponse } from '~/types';

export const Hero = ({ blogger }: { blogger: BloggerResponse }) => {
    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const { toggleSubscribeErrorHandler } = useErrors();
    const [isSubscribed, setIsSubscribed] = useState(blogger.isFavorite);

    const handleSubscribe = async () => {
        try {
            await toggleSubscribe({
                fromUserId: currentUserId,
                toUserId: blogger.bloggerInfo._id,
            });
            setIsSubscribed(!isSubscribed);
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };

    useEffect(() => {
        setIsSubscribed(blogger.isFavorite);
    }, [blogger.isFavorite]);

    return (
        <Box data-test-id={DATA_TEST_IDS.BLOGGER_USER_INFO_BOX} position='relative'>
            <Flex align='center' direction={{ base: 'column', sm: 'row' }} gap={6}>
                <Flex flexBasis='65%'>
                    <Box ml={{ sm: 'auto' }}>
                        <UiAvatar
                            firstName={blogger.bloggerInfo.firstName}
                            lastName={blogger.bloggerInfo.lastName}
                            src={API_IMAGE_URL + blogger.bloggerInfo.photoLink}
                        />
                    </Box>
                </Flex>
                <Box w='100%'>
                    <Box textAlign={{ base: 'center', sm: 'left' }} mb={4}>
                        <Heading
                            data-test-id={DATA_TEST_IDS.BLOGGER_USER_INFO_NAME}
                            mb={3}
                            fontSize={{ base: '24px', md: '48px' }}
                        >{`${blogger.bloggerInfo.firstName} ${blogger.bloggerInfo.lastName}`}</Heading>
                        <Text
                            data-test-id={DATA_TEST_IDS.BLOGGER_USER_INFO_LOGIN}
                            color='text.secondary'
                            fontSize='14px'
                        >
                            @{blogger.bloggerInfo.login}
                        </Text>
                    </Box>
                    <Flex
                        justify={{ base: 'space-between', sm: 'flex-start' }}
                        align='center'
                        w='100%'
                        gap={{ sm: '57px' }}
                    >
                        {isSubscribed ? (
                            <Tooltip
                                data-test-id={DATA_TEST_IDS.BLOG_TOOLTIP}
                                hasArrow
                                placement='bottom-end'
                                label={
                                    <>
                                        <p>Нажмите, если{`${' '}`}</p>
                                        <p>хотите отписаться</p>
                                    </>
                                }
                            >
                                <UiButton
                                    data-test-id={DATA_TEST_IDS.BLOG_TOGGLE_UNSUBSCRIBE}
                                    onClick={handleSubscribe}
                                    leftIcon={<ManIcon />}
                                    size='xs'
                                    variant='outline'
                                    text='Вы подписаны'
                                />
                            </Tooltip>
                        ) : (
                            <UiButton
                                data-test-id={DATA_TEST_IDS.BLOG_TOGGLE_SUBSCRIBE}
                                onClick={handleSubscribe}
                                leftIcon={<SubscribeIcon />}
                                size='xs'
                                variant='solid'
                                text='Подписаться'
                            />
                        )}

                        <UiUserStats
                            subscribersCount={blogger.totalSubscribers}
                            bookmarks={blogger.totalBookmarks}
                        />
                    </Flex>
                </Box>
            </Flex>
            {isLoading && <UiLoader testId={DATA_TEST_IDS.MOBILE_LOADER} />}
        </Box>
    );
};
