import { Box, Flex } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UiButton } from '~/components/ui/UiButton';
import UiCardGrid from '~/components/ui/UiCardGrid';
import { TRecipe } from '~/query/recipe-api';
import { ApplicationState } from '~/store/configure-store';
import { useRecipesSearch } from '~/store/hooks';
import { setCurrentPage } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';

function SearchPage() {
    const [allRecipes, setAllRecipes] = useState<TRecipe[]>([]);
    const pagination = useSelector((state: ApplicationState) => state.recipe.pagination);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const { data, isLoading, isError } = useRecipesSearch();

    const hasMore = pagination.totalPages ? pagination.currentPage < pagination.totalPages : false;

    useEffect(() => {
        if (data?.data) {
            if (pagination.currentPage === 1) {
                // Первая страница - полная замена данных
                setAllRecipes(data.data);
            } else {
                // Последующие страницы - добавление данных
                setAllRecipes((prev) => [...prev, ...data.data]);
            }
        }
    }, [data?.data, pagination.currentPage]);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [filters, dispatch]);

    const loadMore = () => {
        if (hasMore) {
            dispatch(setCurrentPage(pagination.currentPage + 1));
        }
    };

    if (isLoading || isError) return null;

    return (
        <>
            <Box
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box mb={10}>
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
                </Box>
            </Box>
        </>
    );
}

export default memo(SearchPage);
