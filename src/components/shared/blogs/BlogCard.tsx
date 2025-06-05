import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Spinner,
    Tag,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import loader from '~/assets/ui/loader_bg.png';
import { ManIcon } from '~/components/ui/icons/ManIcon';
import { SubscribeIcon } from '~/components/ui/icons/SubscribeIcon';
import { UiButton } from '~/components/ui/UiButton';
import { UiCardStats } from '~/components/ui/UiCardStats';
import { routeHelpers } from '~/utils/get-routes';

type Props = {
    avatarSrc: string;
    name: string[];
    login: string;
    bloggerId?: string;
    isCurrentUserSubscribed?: boolean;
    isLoading?: boolean;
    toggleSubscribe?: VoidFunction;
    note?: string;
    subscribersCount?: number;
    newRecipesCount?: number;
    bookmarksCount?: number;
    showControls?: boolean;
    showStats?: boolean;
    isFavorite?: boolean;
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
    showControls,
    showStats,
    bloggerId,
    toggleSubscribe,
    isCurrentUserSubscribed,
    isLoading,
    isFavorite,
    colsInGrid = 2,
}: Props) => (
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
            <Box position='absolute' right='8px' top='8px'>
                <Tag bg='neutral.20'>{`${newRecipesCount} новых рецептов`}</Tag>
                {/* ???: */}
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
        {showControls ? (
            <CardFooter
                pt={0}
                px={{ base: 4, md: 6 }}
                pb={{ base: 4, md: 5 }}
                justifyContent={{ base: 'flex-end', sm: 'space-between' }}
                alignItems='flex-end'
                flexDirection={{
                    base: 'column',
                    sm: colsInGrid === 2 ? 'row' : 'column',
                    lg: 'row',
                }}
                gap={4}
            >
                <Flex order={{ base: 2, sm: colsInGrid === 2 ? 0 : 2 }} gap={2} align='flex-end'>
                    {isFavorite ? (
                        <UiButton
                            onClick={toggleSubscribe}
                            size='xs'
                            variant='solidAccent'
                            text='Рецепты'
                        />
                    ) : isCurrentUserSubscribed ? (
                        <UiButton
                            onClick={toggleSubscribe}
                            leftIcon={<ManIcon />}
                            size='xs'
                            variant='outline'
                            text='Вы подписаны'
                        />
                    ) : (
                        <UiButton
                            onClick={toggleSubscribe}
                            leftIcon={<SubscribeIcon />}
                            size='xs'
                            variant='solid'
                            text='Подписаться'
                        />
                    )}

                    {bloggerId ? (
                        <Link
                            to={{ pathname: routeHelpers.getBlogPath(bloggerId), hash: '#notes' }}
                        >
                            <UiButton size='xs' variant='accentOutline' text='Читать' />
                        </Link>
                    ) : null}
                </Flex>
                {showStats ? (
                    <UiCardStats bookmarks={bookmarksCount} subscribersCount={subscribersCount} />
                ) : null}
            </CardFooter>
        ) : null}
        {isLoading && <Loader />}
    </Card>
);

function Loader() {
    return (
        <Flex
            // data-test-id={DATA_TEST_IDS.LOADER_SEARCH_BLOCK}
            w='134px'
            h='134px'
            bgImage={loader}
            bgSize='cover'
            alignItems='center'
            justifyContent='center'
            borderRadius='50%'
            position='absolute'
            left={0}
            bottom={0}
            top={0}
            right={0}
            mx='auto'
            my='auto'
        >
            <Spinner size='lg' color='black' />
        </Flex>
    );
}
