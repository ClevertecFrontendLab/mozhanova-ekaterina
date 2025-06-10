import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ErrorResponse, Link } from 'react-router';

import {
    UiReadButton,
    UiRecipesButton,
    UiSubscribeButton,
    UiUnsubscribeButton,
} from '~/components/ui/UiBlogCardButtons';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { UiLoader } from '~/components/ui/UiLoader';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useErrors } from '~/hooks/use-errors';
import { useToggleSubscriptionMutation } from '~/query/blogs-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { getRecipesWord } from '~/utils/get-recipes-word';
import { routeHelpers } from '~/utils/get-routes';

type Props = {
    name: string[];
    login: string;
    bloggerId: string;
    note?: string;
    subscribersCount?: number;
    newRecipesCount?: number;
    bookmarksCount?: number;
    isFavorite?: boolean;
    showFooter?: boolean;
    colsInGrid?: number;
};

export const BlogCard = ({
    name,
    login,
    subscribersCount,
    bookmarksCount,
    note,
    newRecipesCount,
    showFooter = true,
    bloggerId,
    isFavorite,
    colsInGrid = 2,
}: Props) => {
    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();
    const { toggleSubscribeErrorHandler } = useErrors();
    const currentUserId = useAppSelector(selectCurrentUserId);
    const [isSubscribed, setIsSubscribed] = useState(isFavorite);

    const handleSubscribe = async () => {
        try {
            await toggleSubscribe({ fromUserId: currentUserId, toUserId: bloggerId });
            setIsSubscribed(!isSubscribed);
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };

    return (
        <Card
            data-test-id={DATA_TEST_IDS.BLOG_CARD}
            overflow='hidden'
            size={{
                base: 'md',
                md: 'lg',
            }}
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
        >
            {newRecipesCount !== 0 && newRecipesCount && (
                <Box
                    data-test-id={DATA_TEST_IDS.BLOG_CARD_NEW_RECIPES_BADGE}
                    position='absolute'
                    right={{ base: '4px', md: '8px' }}
                    top={{ base: '4px', md: '8px' }}
                >
                    <Tag bg='neutral.20'>{`${newRecipesCount} ${getRecipesWord(newRecipesCount)}`}</Tag>
                </Box>
            )}

            <CardBody>
                <Flex
                    gap={{
                        base: 2,
                        md: 3,
                    }}
                    pt={3}
                    pb={{
                        base: 2,
                        md: 4,
                    }}
                >
                    <Avatar name={`${name[0]} ${name[1]}`} size={{ base: 'sm', md: 'md' }} />
                    <Box minW={0}>
                        <Link to={routeHelpers.getBlogPath(bloggerId)}>
                            <Heading
                                data-test-id={DATA_TEST_IDS.BLOG_CARD_NAME}
                                as='h3'
                                fontSize={{
                                    base: 'md',
                                    md: 'lg',
                                }}
                                fontWeight='500'
                                textOverflow='ellipsis'
                                whiteSpace='nowrap'
                                overflowX='hidden'
                            >
                                {`${name[0]} ${name[1]}`}
                            </Heading>
                        </Link>

                        <Text
                            data-test-id={DATA_TEST_IDS.BLOG_CARD_LOGIN}
                            color='text.secondary'
                            fontSize={{
                                base: 'xs',
                                md: 'sm',
                            }}
                        >
                            {`@${login}`}
                        </Text>
                    </Box>
                </Flex>
                <Text
                    data-test-id={DATA_TEST_IDS.BLOG_CARD_NOTES_TEXT}
                    fontSize='sm'
                    noOfLines={3}
                    pt={{
                        base: 2,
                        md: 3,
                    }}
                >
                    {note}
                </Text>
            </CardBody>
            {showFooter && isFavorite ? <FavoriteCardFooter /> : <Footer />}

            {isLoading && <UiLoader testId={DATA_TEST_IDS.MOBILE_LOADER} />}
        </Card>
    );

    function Footer() {
        return (
            <CardFooter
                flexDirection={{
                    base: 'column',
                    sm: colsInGrid === 2 ? 'row' : 'column',
                    lg: 'row',
                }}
                justifyContent='space-between'
                alignItems='flex-end'
                gap={4}
                pt={0}
                px={{ base: 4, md: 6 }}
                pb={{ base: 4, md: 5 }}
            >
                <Flex
                    order={{ base: 1, sm: colsInGrid === 2 ? 0 : 1, lg: 0 }}
                    gap={2}
                    align='flex-end'
                >
                    {isSubscribed ? (
                        <UiUnsubscribeButton onClick={handleSubscribe} />
                    ) : (
                        <UiSubscribeButton
                            dataTest={DATA_TEST_IDS.BLOG_TOGGLE_SUBSCRIBE}
                            onClick={handleSubscribe}
                        />
                    )}
                    <UiReadButton bloggerId={bloggerId} />
                </Flex>

                <UiCardStats bookmarks={bookmarksCount} subscribersCount={subscribersCount} />
            </CardFooter>
        );
    }
    function FavoriteCardFooter() {
        return (
            <CardFooter
                justifyContent='space-between'
                pt={0}
                px={{ base: 4, md: 6 }}
                pb={{ base: 4, md: 5 }}
            >
                <Flex gap={2}>
                    <UiRecipesButton bloggerId={bloggerId} />
                    <UiReadButton bloggerId={bloggerId} />
                </Flex>

                <UiCardStats bookmarks={bookmarksCount} subscribersCount={subscribersCount} />
            </CardFooter>
        );
    }
};
