import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

import default_image from '~/assets/ui/image_default.png';
import { DATA_TEST_IDS } from '~/constants/test-ids';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { ApplicationState } from '~/store/configure-store';
import { useAppSelector } from '~/store/hooks';
import { RecipesState } from '~/store/recipe-slice';
import {
    selectRecipeCategories,
    selectRecipeSubCategories,
    selectRecommendedBy,
} from '~/store/selectors';
import { Recipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';
import { highlightMatches } from '~/utils/highlight-mathces';

import { BookmarkDeleteIcon } from './icons/BookmarkDeleteIcon';
import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { UiAvatar } from './UiAvatar';
import { UiButton } from './UiButton';
import { UiCardInfo } from './UiCardInfo';

type Props = {
    data: Partial<Recipe>;
    onSave: (id: string) => void;
    onEdit?: (recipe: Partial<Recipe>, category: string, subCategory: string) => void;
    size?: 'sm' | 'md' | 'lg';
    recommendation?: string;
    categoryBgColor?: 'secondary.100' | 'primary.100';
    index?: number;
    isDraft?: boolean;
    editable?: boolean;
    isBookmark?: boolean;
    'data-test-id'?: string;
};

export const UiCard = ({
    data,
    isDraft,
    editable,
    isBookmark,
    size = 'lg',
    index,
    onSave,
    onEdit,
    ...props
}: Props) => {
    const { category, subCategory } = useParams();
    const [isLargerThanMD] = useBreakpoint('md');
    const recommendedBy = useAppSelector((state) =>
        selectRecommendedBy(state, data.recommendedByUserId),
    )?.[0];

    const searchString = useSelector(
        (state: { recipe: RecipesState }) => state.recipe.filters.searchString,
    );

    const subCategories = useSelector((state: ApplicationState) =>
        selectRecipeSubCategories(state, data?.categoriesIds),
    );

    const rootCategories = useSelector((state: ApplicationState) =>
        selectRecipeCategories(state, data?.categoriesIds),
    );
    const categoryRoute = category || (rootCategories[0]?.category ?? '');
    const subCategoryRoute = subCategory || (subCategories[0]?.category ?? '');

    return (
        <Card
            data-test-id={`food-card-${index}`}
            position='relative'
            direction='row'
            overflow='hidden'
            size={isLargerThanMD ? size : 'sm'}
            h='auto'
            {...props}
        >
            <Image
                objectFit='cover'
                minW={{ md: '346px' }}
                maxW={{
                    base: '158px',
                    md: '346px',
                }}
                maxH='100%'
                src={data?.image ? `${API_IMAGE_URL}${data.image}` : default_image}
                alt='card image'
            />

            {!isDraft && recommendedBy && isLargerThanMD && (
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
                    <UiAvatar
                        size='xs'
                        firstName={recommendedBy.firstName}
                        lastName={recommendedBy.lastName}
                        src={API_IMAGE_URL + recommendedBy.photo}
                    />
                    {recommendedBy.firstName + ' ' + recommendedBy.lastName} рекомендует
                </Flex>
            )}

            <Stack spacing={0} flexGrow={1} minW={0}>
                <CardBody>
                    <Flex justify='space-between'>
                        <Box
                            pb={{
                                base: 0,
                                md: 6,
                            }}
                        >
                            <UiCardInfo
                                categoryBgColor='secondary.100'
                                categories={rootCategories?.map((category) => category?._id)}
                                likes={data?.likes}
                                bookmarks={data?.bookmarks}
                                alignItems='flex-start'
                            />
                        </Box>
                        {isDraft && (
                            <Box textAlign='right'>
                                <Tag>Черновик</Tag>
                            </Box>
                        )}
                    </Flex>

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
                            {searchString
                                ? highlightMatches(data?.title, searchString)
                                : data?.title}
                        </Heading>
                        <Text fontSize='sm' noOfLines={3}>
                            {isLargerThanMD && (data.description || '...')}
                        </Text>
                    </Flex>
                </CardBody>

                <CardFooter>
                    {editable && onEdit && (
                        <Flex justify='flex-end' grow={1}>
                            <UiButton
                                data-test-id={DATA_TEST_IDS.PROFILE_EDIT_BUTTON}
                                variant={isDraft ? 'solid' : 'outline'}
                                size={{ base: 'xs', md: 'sm' }}
                                text='Редактировать'
                                onClick={() => onEdit(data, categoryRoute, subCategoryRoute)}
                            />
                        </Flex>
                    )}
                    {isBookmark && (
                        <Flex justify='flex-end' grow={1}>
                            <UiButton
                                variant={isDraft ? 'solid' : 'outline'}
                                size={{ base: 'xs', md: 'sm' }}
                                text='Убрать из сохранённых'
                                leftIcon={<BookmarkDeleteIcon />}
                                onClick={() => onSave(data._id!)}
                            />
                        </Flex>
                    )}
                    {!isBookmark && !editable && (
                        <Flex gap='8px' justify='flex-end' align='flex-end' w='100%'>
                            <UiButton
                                onClick={() => onSave(data._id!)}
                                size={{ base: 'xs', md: 'sm' }}
                                text='Сохранить'
                                leftIcon={isLargerThanMD ? <BookmarkHeartIcon /> : undefined}
                                icon={
                                    <BookmarkHeartIcon size={!isLargerThanMD ? '12px' : '16px'} />
                                }
                                iconButton={!isLargerThanMD}
                            />
                            {((category && subCategories) || (rootCategories && subCategories)) && (
                                <Link
                                    to={routeHelpers.getRecipePath(
                                        categoryRoute,
                                        subCategoryRoute,
                                        data!._id!,
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
                    )}
                </CardFooter>
            </Stack>
        </Card>
    );
};
