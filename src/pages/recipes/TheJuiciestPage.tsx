import { Box, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RelevantKitchenBlock } from '~/components/shared/RelevantKitchenBlock';
import { SearchBar } from '~/components/shared/search-bar/SearchBar';
import { UiCardGrid } from '~/components/ui/UiCardGrid';
import { UiShowMoreButton } from '~/components/ui/UiShowMoreButton';
import { Limit } from '~/query/constants/limits';
import { useGetPopularRecipesQuery } from '~/query/recipe-api';
import { paginationSelector, setCurrentPage } from '~/store/recipe-slice';
import { selectFilters } from '~/store/selectors';
import { Recipe } from '~/types';

export const TheJuiciestPage = () => {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const pagination = useSelector(paginationSelector);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const { data, isLoading, isError, currentData } = useGetPopularRecipesQuery(
        {
            limit: Limit.DEFAULT,
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
                setAllRecipes(currentData.data);
            } else {
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
        <main>
            <SearchBar title='Самое сочное' />
            <Grid
                gap={{ base: 8, md: 10 }}
                padding={{
                    base: '0 16px',
                    md: '0 20px',
                    lg: '0 24px',
                }}
            >
                <Box>
                    <UiCardGrid data={allRecipes} />
                    {hasMore && <UiShowMoreButton onShowMore={loadMore} />}
                </Box>
                <RelevantKitchenBlock />
            </Grid>
        </main>
    );
};
