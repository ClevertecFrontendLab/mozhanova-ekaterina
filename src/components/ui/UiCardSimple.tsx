import { Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { ApplicationState } from '~/store/configure-store';
import { selectRecipeCategories, selectRecipeSubCategories } from '~/store/selectors';
import { Recipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { EmojiHeartEyesIcon } from './icons/EmojiHeartEyesIcon';
import { UiCardBadge } from './UiCardBadge';

export const UiCardSimple = ({
    data: { title, description, bookmarks, likes, categoriesIds, _id },
}: {
    data: Recipe;
}) => {
    const subCategories = useSelector((state: ApplicationState) =>
        selectRecipeSubCategories(state, categoriesIds),
    );

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, categoriesIds),
    );

    const categoryRoute = rootCategories[0]?.category ?? '';
    const subCategoryRoute = subCategories[0]?.category ?? '';

    return (
        <Card
            h='100%'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                shadow: 'themeNeutralGreen',
            }}
            variant='outline'
        >
            <Link to={routeHelpers.getRecipePath(categoryRoute, subCategoryRoute, _id)}>
                <CardBody
                    p={{
                        base: 3,
                        lg: 4,
                        xl: '24px 24px 20px',
                    }}
                    gap={{
                        base: 6,
                    }}
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                >
                    <Box>
                        <Heading
                            as='h3'
                            fontWeight='500'
                            size={{
                                base: 'sm',
                                md: 'md',
                            }}
                            pb={2}
                            textOverflow='ellipsis'
                            whiteSpace='nowrap'
                            overflowX='hidden'
                        >
                            {title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {description}
                        </Text>
                    </Box>
                    <Flex wrap='wrap' gap={2}>
                        {rootCategories?.map((category) => (
                            <UiCardBadge
                                key={`badge-${category?._id}`}
                                color='secondary.100'
                                categoryId={category?._id}
                            />
                        ))}

                        <Flex
                            right={{
                                base: '12px',
                                lg: '24px',
                            }}
                            bottom={{
                                base: '12px',
                                lg: '20px',
                            }}
                            position='absolute'
                            alignItems='center'
                            fontSize='12px'
                            gap='8px'
                            color='primary.400'
                            fontWeight='600'
                            bgColor='neutral.0'
                        >
                            {bookmarks !== 0 && (
                                <Flex p='4px' gap='6px'>
                                    <BookmarkHeartIcon />
                                    {bookmarks}
                                </Flex>
                            )}
                            {likes !== 0 && (
                                <Flex p='4px' gap='6px'>
                                    <EmojiHeartEyesIcon />
                                    {likes}
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </CardBody>
            </Link>
        </Card>
    );
};
