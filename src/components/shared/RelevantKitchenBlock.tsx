import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useToast } from '~/hooks/use-toast';
import { useGetRecipesByCategoryQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { useAppSelector } from '~/store/hooks';
import { selectCategoryById, selectSubcategories } from '~/store/selectors';
import { TCategory, TSubCategory } from '~/types';

import { UiCardMini } from '../ui/UiCardMini';
import { UiCardSimple } from '../ui/UiCardSimple';

export const RelevantKitchenBlock = () => {
    const { category } = useParams();
    const allSubCategories = useAppSelector(selectSubcategories) as TSubCategory[];
    const [randomSubCategory, setRandomSubCategory] = useState<TSubCategory | null>(null);
    const { showError } = useToast();

    const currentRootCategory = useAppSelector((state: ApplicationState) =>
        selectCategoryById(state, randomSubCategory?.rootCategoryId || ''),
    ) as TCategory;

    useEffect(() => {
        if (allSubCategories.length > 0) {
            const randomIndex = Math.floor(Math.random() * allSubCategories.length);
            setRandomSubCategory(allSubCategories[randomIndex]);
        }
    }, [allSubCategories, category]);

    const { data, isError, refetch } = useGetRecipesByCategoryQuery(
        {
            categoryId: randomSubCategory?._id || '',
            limit: 5,
        },
        {
            skip: !randomSubCategory,
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (randomSubCategory?._id) {
            refetch();
        }
    }, [category, refetch, randomSubCategory?._id]);

    useEffect(() => {
        if (isError) {
            showError('Ошибка сервера', 'Попробуйте поискать снова попозже');
        }
    }, [isError, showError]);

    const relevantLeft =
        data?.data.slice(0, 2).map((recipe) => <UiCardSimple key={recipe._id} data={recipe} />) ||
        null;
    const relevantRight =
        data?.data.slice(2, 5).map((recipe) => <UiCardMini key={recipe._id} data={recipe} />) ||
        null;

    return (
        <Box pb={4}>
            <Grid
                pt={{
                    base: 2,
                    md: 6,
                }}
                pb={{
                    base: 4,
                    md: 6,
                }}
                gap={{
                    base: 3,
                    lg: 4,
                    xl: 6,
                }}
                borderTop='1px solid'
                borderColor='border.light'
                templateColumns={{
                    base: '1fr',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(2, 1fr)',
                }}
            >
                <Heading
                    as='h2'
                    fontSize={{
                        base: '2xl',
                        md: '4xl',
                        lg: '5xl',
                    }}
                    fontWeight='500'
                >
                    {currentRootCategory?.title || ''}
                </Heading>

                <Text
                    gridColumn={{
                        sm: '2/4',
                        lg: '2/3',
                    }}
                    fontWeight='500'
                    color='text.secondary'
                    fontSize={{
                        base: 'sm',
                        md: 'md',
                    }}
                >
                    {currentRootCategory?.description || ''}
                </Text>
            </Grid>

            <Grid
                gap={{
                    base: 3,
                    lg: 4,
                    xl: 6,
                }}
                templateColumns={{
                    base: '1fr',
                    sm: 'repeat(3, 1fr)',
                    xl: 'repeat(2, 1fr)',
                }}
            >
                <Grid
                    gap={{
                        base: 3,
                        lg: 4,
                        xl: 6,
                    }}
                    templateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                    }}
                    gridColumn={{
                        sm: '1/3',
                        xl: '1/2',
                    }}
                >
                    {relevantLeft}
                </Grid>

                <Flex
                    direction='column'
                    gap={{
                        base: 2.5,
                        md: 1.5,
                        lg: 3,
                    }}
                    minW={0}
                >
                    {relevantRight}
                </Flex>
            </Grid>
        </Box>
    );
};
