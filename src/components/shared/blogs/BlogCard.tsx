import { Box, Card, CardBody, CardFooter, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react';
import { ErrorResponse, Link } from 'react-router';

import {
    UiReadButton,
    UiRecipesButton,
    UiSubscribeButton,
} from '~/components/ui/UiBlogCardButtons';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { UiLoader } from '~/components/ui/UiLoader';
import { useErrors } from '~/hooks/use-errors';
import { useToggleSubscriptionMutation } from '~/query/blogs-api';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUserId } from '~/store/selectors';
import { routeHelpers } from '~/utils/get-routes';

type Props = {
    avatarSrc: string;
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
    avatarSrc,
    showFooter = true,
    bloggerId,
    isFavorite,
    colsInGrid = 2,
}: Props) => {
    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();
    const { toggleSubscribeErrorHandler } = useErrors();
    const currentUserId = useAppSelector(selectCurrentUserId);

    const handleSubscribe = async () => {
        try {
            await toggleSubscribe({ fromUserId: currentUserId, toUserId: bloggerId });
        } catch (error) {
            toggleSubscribeErrorHandler(error as ErrorResponse);
        }
    };
    return (
        <Card
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
            {newRecipesCount ? (
                <Box
                    position='absolute'
                    right={{ base: '4px', md: '8px' }}
                    top={{ base: '4px', md: '8px' }}
                >
                    <Tag bg='neutral.20'>{`${newRecipesCount} новых рецептов`}</Tag>
                </Box>
            ) : null}

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
                    <Image
                        w={{
                            base: '32px',
                            md: '48px',
                        }}
                        h={{
                            base: '32px',
                            md: '48px',
                        }}
                        src={avatarSrc}
                        alt='avatar'
                    />
                    <Box minW={0}>
                        <Link to={routeHelpers.getBlogPath(bloggerId)}>
                            <Heading
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
            {showFooter ? isFavorite ? <FavoriteCardFooter /> : <Footer /> : null}

            {isLoading && <UiLoader />}
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
                <Flex order={{ base: 1 }} gap={2} align='flex-end'>
                    <UiSubscribeButton handleSubscribe={handleSubscribe} />
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
