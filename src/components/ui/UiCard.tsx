import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ErrorResponse, Link, useParams } from 'react-router';

import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useErrors } from '~/hooks/use-errors';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useSaveRemoveFromBookmarksMutation } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { RecipesState } from '~/store/recipe-slice';
import { selectRecipeCategories, selectRecipeSubCategories } from '~/store/selectors';
import { Recipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';
import { highlightMatches } from '~/utils/highlight-mathces';

import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { UiButton } from './UiButton';
import { UiCardInfo } from './UiCardInfo';

type Props = {
    data: Recipe;
    size?: 'sm' | 'md' | 'lg';
    recommendation?: string;
    categoryBgColor?: 'secondary.100' | 'primary.100';
    index?: number;
    'data-test-id'?: string;
};

export const UiCard = ({
    data: { title, description, image, categoriesIds, likes, bookmarks, _id },
    recommendation,
    size = 'lg',
    index,
    ...props
}: Props) => {
    const { category, subCategory } = useParams();
    const [isLargerThanMD] = useBreakpoint('md');
    const [saveRecipe] = useSaveRemoveFromBookmarksMutation();
    const { saveLikeRecipeErrorHandler } = useErrors();

    const searchString = useSelector(
        (state: { recipe: RecipesState }) => state.recipe.filters.searchString,
    );

    const subCategories = useSelector((state: ApplicationState) =>
        selectRecipeSubCategories(state, categoriesIds),
    );

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, categoriesIds),
    );
    const categoryRoute = category || (rootCategories[0]?.category ?? '');
    const subCategoryRoute = subCategory || (subCategories[0]?.category ?? '');

    const handleSave = async () => {
        try {
            await saveRecipe(_id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };

    return (
        <Card
            position='relative'
            direction='row'
            overflow='hidden'
            size={isLargerThanMD ? size : 'sm'}
            h='auto'
            {...props}
        >
            <Image
                objectFit='cover'
                maxW={{
                    base: '158px',
                    md: '346px',
                }}
                maxH='100%'
                src={`${API_IMAGE_URL}${image}`}
                alt='card image'
            />

            {recommendation && isLargerThanMD && (
                <Flex
                    position='absolute'
                    bottom='20px'
                    left='24px'
                    bg='primary.100'
                    padding='4px 8px'
                    gap='8px'
                    fontSize='14px'
                    borderRadius='4px'
                    align='center'
                >
                    <Avatar name='Можанова Екатерина' size='xs' />
                    {recommendation} рекомендует
                </Flex>
            )}

            <Stack spacing={0} flexGrow={1}>
                <CardBody>
                    <Box
                        pb={{
                            base: 0,
                            md: 6,
                        }}
                    >
                        <UiCardInfo
                            categoryBgColor='secondary.100'
                            categories={rootCategories?.map((category) => category?._id)}
                            likes={likes}
                            bookmarks={bookmarks}
                            alignItems='flex-start'
                        />
                    </Box>

                    <Flex
                        gap={{
                            base: 5,
                            md: 2,
                        }}
                        direction='column'
                        textAlign='left'
                    >
                        <Heading
                            as='h3'
                            fontWeight='500'
                            size={{
                                base: 'sm',
                                md: 'md',
                            }}
                            noOfLines={{
                                base: 2,
                                md: 1,
                            }}
                        >
                            {searchString ? highlightMatches(title, searchString) : title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {isLargerThanMD && description}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter>
                    <Flex gap='8px' justify='flex-end' align='flex-end' w='100%'>
                        <UiButton
                            onClick={handleSave}
                            size={{ base: 'xs', md: 'sm' }}
                            text='Сохранить'
                            leftIcon={isLargerThanMD ? <BookmarkHeartIcon /> : undefined}
                            icon={<BookmarkHeartIcon size={!isLargerThanMD ? '12px' : '16px'} />}
                            iconButton={!isLargerThanMD}
                        />
                        {((category && subCategories) || (rootCategories && subCategories)) && (
                            <Link
                                to={routeHelpers.getRecipePath(
                                    categoryRoute,
                                    subCategoryRoute,
                                    _id,
                                )}
                            >
                                <UiButton
                                    data-test-id={`card-link-${index}`}
                                    size={isLargerThanMD ? 'sm' : 'xs'}
                                    text='Готовить'
                                    variant='solid'
                                />
                            </Link>
                        )}
                    </Flex>
                </CardFooter>
            </Stack>
        </Card>
    );
};
