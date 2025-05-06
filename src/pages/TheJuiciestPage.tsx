import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiButton } from '~/components/ui/UiButton';
import UiCardGrid from '~/components/ui/UiCardGrid';
import { TRecipe, useGetPopularRecipesQuery } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { setCurrentPage } from '~/store/recipe-slice';

export function TheJuiciestPage() {
    const [allRecipes, setAllRecipes] = useState<TRecipe[]>([]);
    const pagination = useSelector((state: ApplicationState) => state.recipe.pagination);
    const filters = useSelector((state: ApplicationState) => state.recipe.filters);
    const dispatch = useDispatch();

    const { data, isLoading, isError, currentData, isFetching } = useGetPopularRecipesQuery(
        {
            limit: 8,
            page: pagination.currentPage,
            ...(filters.allergens.length > 0 && { allergens: filters.allergens }),
            ...(filters.searchString && { searchString: filters.searchString }),
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );
    const hasMore = data?.meta ? pagination.currentPage < data.meta.totalPages : false;

    useEffect(() => {
        if (currentData?.data) {
            if (pagination.currentPage === 1) {
                // Первая страница - полная замена данных
                setAllRecipes(currentData.data);
            } else {
                // Последующие страницы - добавление данных
                setAllRecipes((prev) => [...prev, ...currentData.data]);
            }
        }
    }, [currentData?.data, pagination.currentPage]);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [filters, dispatch]);

    const loadMore = () => {
        if (hasMore) {
            dispatch(setCurrentPage(pagination.currentPage + 1));
        }
    };

    if (isError || isLoading) return null;

    return (
        <>
            <SearchBar
                data={currentData?.data}
                isFetching={isFetching}
                isError={isError}
                title='Самое сочное'
            />
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <UiCardGrid data={allRecipes} />
                {hasMore && (
                    <Flex justifyContent='center' mt={4} mb={10}>
                        <UiButton
                            onClick={loadMore}
                            size='md'
                            text='Загрузить еще'
                            variant='primary'
                        />
                    </Flex>
                )}
                <RelevantKitchenBlock />
            </Box>
        </>
    );
}
