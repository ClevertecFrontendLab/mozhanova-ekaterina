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
    Tag,
    Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse, Link, useNavigate, useParams } from 'react-router';

import default_image from '~/assets/ui/image_default.png';
import { useBreakpoint } from '~/hooks/use-breakpoint';
import { useErrors } from '~/hooks/use-errors';
import { API_IMAGE_URL } from '~/query/constants/api-config';
import { useSaveRemoveFromBookmarksMutation } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { RecipesState, setDraft } from '~/store/recipe-slice';
import { selectRecipeCategories, selectRecipeSubCategories } from '~/store/selectors';
import { Recipe } from '~/types';
import { routeHelpers } from '~/utils/get-routes';
import { highlightMatches } from '~/utils/highlight-mathces';

import { BookmarkDeleteIcon } from './icons/BookmarkDeleteIcon';
import { BookmarkHeartIcon } from './icons/BookmarkHeartIcon';
import { UiButton } from './UiButton';
import { UiCardInfo } from './UiCardInfo';

type Props = {
    data: Partial<Recipe>;
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
    recommendation,
    size = 'lg',
    index,
    ...props
}: Props) => {
    const { category, subCategory } = useParams();
    const [isLargerThanMD] = useBreakpoint('md');
    const [toggleSave] = useSaveRemoveFromBookmarksMutation();
    const { saveLikeRecipeErrorHandler } = useErrors();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleSave = async () => {
        if (!data?._id) return;
        try {
            await toggleSave(data._id).unwrap();
        } catch (error) {
            saveLikeRecipeErrorHandler(error as ErrorResponse);
        }
    };

    const handleEdit = () => {
        if (!data) return;
        dispatch(setDraft(data as Recipe));
        navigate(routeHelpers.getEditDraftPath(data._id!));
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
                minW={{ md: '346px' }}
                maxW={{
                    base: '158px',
                    md: '346px',
                }}
                maxH='100%'
                src={data?.image ? `${API_IMAGE_URL}${data.image}` : default_image}
                alt='card image'
            />

            {!isDraft && recommendation && isLargerThanMD && (
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

            <Stack spacing={0} flexGrow={1} minW={0}>
                <CardBody>
                    {isDraft ? (
                        <Box textAlign='right'>
                            <Tag>Черновик</Tag>
                        </Box>
                    ) : (
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
                    )}

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
                    {editable && (
                        <Flex justify='flex-end' grow={1}>
                            <UiButton
                                variant={isDraft ? 'solid' : 'outline'}
                                size={{ base: 'xs', md: 'sm' }}
                                text='Редактировать'
                                onClick={handleEdit}
                            />
                        </Flex>
                    )}
                    {isBookmark && (
                        <Flex justify='flex-end' grow={1}>
                            <UiButton
                                variant={isDraft ? 'solid' : 'outline'}
                                size={{ base: 'xs', md: 'sm' }}
                                text='Убрать из сохраненных'
                                leftIcon={<BookmarkDeleteIcon />}
                                onClick={handleSave}
                            />
                        </Flex>
                    )}
                    {!isBookmark && !editable && (
                        <Flex gap='8px' justify='flex-end' align='flex-end' w='100%'>
                            <UiButton
                                onClick={handleSave}
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
